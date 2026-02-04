import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getVoterById } from "../api/voterApi"

function Search() {
  const [voterId, setVoterId] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSearch = async () => {
    setError("")
    if (!voterId) {
      setError("Please enter Voter ID")
      return
    }

    try {
      const data = await getVoterById(voterId)

      // navigate to voter profile with data
      navigate("/voter-profile", { state: data })
    } catch (err) {
      setError("Voter not found")
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Search Voter</h2>

      <input
        placeholder="Enter Voter ID"
        value={voterId}
        onChange={(e) => setVoterId(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default Search
