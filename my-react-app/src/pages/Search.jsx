import { useState } from "react";
import { getVoterById } from "../api/voterApi";
import VoterProfile from "./VoterProfile";

function Search() {
  const [voterId, setVoterId] = useState("");
  const [voter, setVoter] = useState(null);
  const [error, setError] = useState("");

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

      {voter && <VoterProfile voter={voter} />}
    </div>
  );
}

export default Search;
