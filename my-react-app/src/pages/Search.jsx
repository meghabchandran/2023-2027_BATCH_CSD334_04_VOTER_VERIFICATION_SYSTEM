import { useState } from "react"
import { getVoterById } from "../api/voterApi"

function Search() {
  const [voterId, setVoterId] = useState("")
  const [voter, setVoter] = useState(null)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!voterId) return
    try {
      const data = await getVoterById(voterId)
      setVoter(data)
      setError("")
    } catch (err) {
      setError("Voter not found")
      setVoter(null)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search Voter</h1>
      <input
        type="text"
        placeholder="Enter Voter ID"
        value={voterId}
        onChange={(e) => setVoterId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {voter && (
        <div style={{ marginTop: "20px" }}>
          <h2>Voter Details</h2>
          <p><strong>ID:</strong> {voter.voter_id}</p>
          <p><strong>Name:</strong> {voter.name}</p>
          <p><strong>Age:</strong> {voter.age}</p>
          <p><strong>Has Voted:</strong> {voter.has_voted ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  )
}

export default Search
