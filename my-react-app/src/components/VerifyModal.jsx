import { useState } from "react";
import { verifyVoterFace } from "../api/voterApi";

function VerifyModal({ voterId, onClose, onSuccess }) {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setMessage("");
  };

  const handleVerify = async () => {
    if (!image) {
      setMessage("Please select an image");
      return;
    }
    try {
      const result = await verifyVoterFace(voterId, image);
      if (result.verified) {
        setMessage("Verified ✅");
        onSuccess(); // call parent to mark voted
      } else {
        setMessage(result.message || "Face does not match ❌");
      }
    } catch (err) {
      setMessage("Error verifying face");
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
        <h3>Verify Face</h3>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <br /><br />
        <button onClick={handleVerify}>Verify</button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>Close</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default VerifyModal;
