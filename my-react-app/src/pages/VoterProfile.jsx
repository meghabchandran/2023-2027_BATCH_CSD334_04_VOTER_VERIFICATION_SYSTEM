import { useState } from "react";
import { verifyVoterFace, markVoterAsVoted } from "../api/voterApi";
import VerifyModal from "../components/VerifyModal";

function VoterProfile({ voter }) {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(voter.has_voted ? "VOTED" : "Not Verified");

  const handleVerificationSuccess = async () => {
    setStatus("Verified");
    // Mark as voted immediately after successful verification
    try {
      await markVoterAsVoted(voter.voter_id);
      setStatus("VOTED");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Voter Details</h2>
      <p><strong>Name:</strong> {voter.name}</p>
      <p><strong>ID:</strong> {voter.voter_id}</p>
      <p><strong>Has Voted:</strong> {voter.has_voted ? "Yes" : "No"}</p>
      <p><strong>Status:</strong> {status}</p>

      {!voter.has_voted && (
        <button onClick={() => setShowModal(true)}>Verify Face</button>
      )}

      {showModal && (
        <VerifyModal
          voterId={voter.voter_id}
          onClose={() => setShowModal(false)}
          onSuccess={handleVerificationSuccess}
        />
      )}
    </div>
  );
}

export default VoterProfile;
