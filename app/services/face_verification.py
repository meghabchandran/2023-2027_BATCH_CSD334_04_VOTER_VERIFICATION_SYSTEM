import cv2
import numpy as np
import os
import tempfile
from deepface import DeepFace


async def verify_face(stored_image_path: str, uploaded_file) -> bool:
    """
    Performs 1:1 face verification using DeepFace.
    Uses multiple detector backends as fallback so face detection
    doesn't fail on different lighting / image quality.
    """

    # ── 1. Check stored image ─────────────────────────────────────────────────
    if not os.path.exists(stored_image_path):
        print("❌ Stored image not found:", stored_image_path)
        return False

    # ── 2. Decode uploaded image ──────────────────────────────────────────────
    uploaded_bytes = await uploaded_file.read()
    nparr = np.frombuffer(uploaded_bytes, np.uint8)
    live_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if live_image is None:
        print("❌ Live image could not be decoded")
        return False

    # Save live image to temp file
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        tmp_path = tmp.name
        cv2.imwrite(tmp_path, live_image)

    print(f"📸 Stored image: {stored_image_path}")
    print(f"📸 Live image saved to: {tmp_path}")

    try:
        # ── 3. Try multiple detector backends as fallback ─────────────────────
        # "opencv"     → fastest, struggles with angles/lighting
        # "ssd"        → better detection
        # "retinaface" → best detection, slowest
        backends = ["opencv", "ssd", "retinaface"]
        result = None

        for backend in backends:
            try:
                print(f"🔍 Trying detector backend: {backend}")
                result = DeepFace.verify(
                    img1_path=stored_image_path,
                    img2_path=tmp_path,
                    model_name="Facenet",
                    detector_backend=backend,
                    enforce_detection=True,
                    distance_metric="cosine"
                )
                print(f"✅ Face detected using backend: {backend}")
                break  # Stop trying if one works

            except ValueError as e:
                print(f"⚠️  Backend '{backend}' failed: {e}")
                continue  # Try next backend

        # ── 4. If all backends failed, try with enforce_detection=False ───────
        if result is None:
            print("⚠️  All backends failed with enforce_detection=True")
            print("🔁 Retrying with enforce_detection=False (no face required)...")
            try:
                result = DeepFace.verify(
                    img1_path=stored_image_path,
                    img2_path=tmp_path,
                    model_name="Facenet",
                    detector_backend="opencv",
                    enforce_detection=False,  # Don't fail if no face found
                    distance_metric="cosine"
                )
                print("✅ Completed with enforce_detection=False")
            except Exception as e:
                print(f"❌ Final fallback also failed: {e}")
                return False

        # ── 5. Decision ───────────────────────────────────────────────────────
        distance  = result["distance"]
        verified  = result["verified"]
        similarity = (1 - distance) * 100

        # Custom threshold: 0.55 suits ID photo vs webcam gap
        CUSTOM_THRESHOLD = 0.55
        verified = distance < CUSTOM_THRESHOLD

        print(f"📊 Distance: {distance:.4f}  |  Threshold: {CUSTOM_THRESHOLD}  |  Similarity: {similarity:.1f}%")

        if verified:
            print("✅ Face verified")
        else:
            print("❌ Face does NOT match")

        return verified

    except Exception as e:
        print(f"❌ Unexpected error during verification: {e}")
        return False

    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)