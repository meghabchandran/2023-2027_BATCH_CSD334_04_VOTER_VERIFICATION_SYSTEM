import { useLocation } from "react-router-dom"

function VoterProfile() {
  const { state } = useLocation()

  if (!state) {
    return <p>No voter data</p>
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Voter Profile</h2>
      <p><b>Name:</b> {state.name}</p>
      <p><b>Voter ID:</b> {state.voter_id}</p>
      <p><b>Age:</b> {state.age}</p>
      <p><b>Booth ID:</b> {state.booth_id}</p>

      <p>
        <b>Status:</b>{" "}
        {state.has_voted ? (
          <span style={{ color: "red" }}>VOTED</span>
        ) : (
          <span style={{ color: "green" }}>NOT VOTED</span>
        )}
      </p>
    </div>
  )
}

export default VoterProfile
