// src/pages/VoterProfile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VoterProfile({ voter }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(voter.has_voted ? "VOTED" : "Not Verified");

  return (
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Voter Details</h2>
      <p><strong>Name:</strong> {voter.name}</p>
      <p><strong>ID:</strong> {voter.voter_id}</p>
      <p><strong>Has Voted:</strong> {voter.has_voted ? "Yes" : "No"}</p>
      <p><strong>Status:</strong> {status}</p>

      {/* Navigate to full VerifyVoter page */}
      {!voter.has_voted && (
        <button
          onClick={() => navigate(`/verify/${voter.voter_id}`)}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Verify Face
        </button>
      )}
    </div>
  );
}

export default VoterProfile;