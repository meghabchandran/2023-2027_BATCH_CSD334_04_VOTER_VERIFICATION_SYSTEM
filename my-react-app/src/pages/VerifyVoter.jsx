// src/pages/VerifyVoter.jsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getVoterById, verifyVoterFace } from "../api/voterApi";

function VerifyVoter() {
  const { voterId } = useParams();
  const [voter, setVoter] = useState(null);
  const [message, setMessage] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Fetch voter details
  useEffect(() => {
    async function fetchVoter() {
      try {
        const data = await getVoterById(voterId);
        setVoter(data);
      } catch (err) {
        setMessage("Error fetching voter details");
      }
    }
    fetchVoter();
  }, [voterId]);

  // Start camera
  const startCamera = async () => {
    if (!cameraOn && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        streamRef.current = stream;
        setCameraOn(true);
        setMessage("Camera started. Capture your image.");
      } catch (err) {
        setMessage("Cannot access camera");
      }
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraOn(false);
    }
  };

  // Capture image
  const captureImage = () => {
    if (!cameraOn) {
      setMessage("Camera is not started");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setCapturedImage(blob);
      setMessage("Image captured! Click Verify to continue.");
    }, "image/jpeg");
  };

  // Verify face
  const handleVerify = async () => {
    if (!capturedImage) {
      setMessage("Please capture an image first");
      return;
    }

    try {
      const result = await verifyVoterFace(voterId, capturedImage);
      if (result.verified) {
        setMessage("✅ Verified successfully!");
      } else {
        setMessage(result.message || "❌ Face does not match");
      }
      stopCamera();
    } catch (err) {
      setMessage("Error verifying face");
    }
  };

  if (!voter) return <p>Loading voter details...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Verify Voter</h2>
      <div style={{ marginBottom: "20px" }}>
        <p><strong>ID:</strong> {voter.voter_id}</p>
        <p><strong>Name:</strong> {voter.name}</p>
        <p><strong>Father's Name:</strong> {voter.fathers_name}</p>
        <p><strong>Spouse Name:</strong> {voter.spouse_name}</p>
        <p><strong>Gender:</strong> {voter.gender}</p>
        <p><strong>Address:</strong> {voter.address}</p>
        <p><strong>DOB:</strong> {voter.dob}</p>
        <p><strong>Age:</strong> {voter.age}</p>
        <p><strong>Booth ID:</strong> {voter.booth_id}</p>
        <p><strong>Aadhaar ID:</strong> {voter.aadhaar_id}</p>
        <p><strong>Has Voted:</strong> {voter.has_voted ? "Yes" : "No"}</p>
      </div>

      <div>
        <video
          ref={videoRef}
          style={{ width: "400px", border: "1px solid black" }}
          autoPlay
        ></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={startCamera} disabled={cameraOn}>
          Open Camera
        </button>
        <button onClick={captureImage} style={{ marginLeft: "10px" }} disabled={!cameraOn}>
          Capture
        </button>
        <button onClick={handleVerify} style={{ marginLeft: "10px" }} disabled={!capturedImage}>
          Verify
        </button>
        {cameraOn && (
          <button onClick={stopCamera} style={{ marginLeft: "10px" }}>
            Stop Camera
          </button>
        )}
      </div>

      {message && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}

export default VerifyVoter;