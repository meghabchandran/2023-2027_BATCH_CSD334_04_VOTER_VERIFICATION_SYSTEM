import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVoterById } from "../api/voterApi";
import VoterProfile from "./VoterProfile";

function Search() {
  const [voterId, setVoterId] = useState("");
  const [voter, setVoter] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError("");
    setVoter(null);

    if (!voterId) {
      setError("Please enter a Voter ID");
      return;
    }

    try {
      const data = await getVoterById(voterId);
      setVoter(data);
    } catch (err) {
      setError("Voter not found");
    }
  };

  const handleVerifyClick = () => {
    if (voter) {
      // Navigate to Verify page with voterId in URL
      navigate(`/verify/${voter.voter_id}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Voter</h1>
      <input
        type="text"
        placeholder="Enter Voter ID"
        value={voterId}
        onChange={(e) => setVoterId(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {voter && (
        <div style={{ marginTop: "20px" }}>
          <VoterProfile voter={voter} />
          <button onClick={handleVerifyClick} style={{ marginTop: "10px" }}>
            Verify Face
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;