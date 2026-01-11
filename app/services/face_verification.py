import cv2
import numpy as np
import os

def verify_face(stored_image_path: str, uploaded_file) -> bool:
    """
    Performs 1:1 face verification using OpenCV.
    Compares stored reference image with uploaded image from webcam.
    Returns True if match, else False.
    """

    # Check if stored image exists
    if not os.path.exists(stored_image_path):
        return False

    # Read stored reference image
    stored_image = cv2.imread(stored_image_path)
    if stored_image is None:
        return False

    # Convert to grayscale
    stored_gray = cv2.cvtColor(stored_image, cv2.COLOR_BGR2GRAY)

    # Read uploaded image from UploadFile
    uploaded_bytes = uploaded_file.file.read()
    nparr = np.frombuffer(uploaded_bytes, np.uint8)
    live_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if live_image is None:
        return False

    live_gray = cv2.cvtColor(live_image, cv2.COLOR_BGR2GRAY)

    #  Detect faces using Haar Cascade
    haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

    stored_faces = haar_cascade.detectMultiScale(stored_gray, scaleFactor=1.1, minNeighbors=5)
    live_faces = haar_cascade.detectMultiScale(live_gray, scaleFactor=1.1, minNeighbors=5)

    # No face detected
    if len(stored_faces) == 0 or len(live_faces) == 0:
        return False

    #  Take first detected face from each
    x, y, w, h = stored_faces[0]
    stored_face_crop = stored_gray[y:y+h, x:x+w]

    x2, y2, w2, h2 = live_faces[0]
    live_face_crop = live_gray[y2:y2+h2, x2:x2+w2]

    # Resize to same size
    stored_face_crop = cv2.resize(stored_face_crop, (100, 100))
    live_face_crop = cv2.resize(live_face_crop, (100, 100))

    # Compare using Mean Squared Error
    mse = np.mean((stored_face_crop - live_face_crop) ** 2)
    threshold = 200  # tune this for demo purposes

    return mse < threshold
