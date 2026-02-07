import mockBooths from "../mocks/mockbooth";
import mockCandidates from "../mocks/mockcandidates";

function Dashboard() {
  const boothId = localStorage.getItem("boothId");
  const booth = mockBooths.find((b) => b.booth_id === boothId);

  return (
    <div>
      <h1>Polling Booth Dashboard</h1>

      {/* Booth Details Section */}
      <section>
        <h2>Booth Details</h2>
        <p>
          <strong>Booth ID:</strong> {boothId}
        </p>
        <p>
          <strong>Booth Name:</strong> {booth?.booth_name}
        </p>
        <p>
          <strong>Constituency:</strong> {booth?.constituency}
        </p>
      </section>

      {/* Candidates Section */}
      <section>
        <h2>Candidates</h2>

        {mockCandidates.map((candidate) => (
          <div key={candidate.id} style={{ marginBottom: "10px" }}>
            <img
              src={candidate.photo}
              alt={candidate.name}
              width="80"
              height="80"
            />

            <img
              src={candidate.partyLogo}
              alt={candidate.party}
              width="40"
              height="40"
            />
            <p>
              <strong>Name:</strong> {candidate.name}
            </p>
            <p>
              <strong>Party:</strong> {candidate.party}
            </p>
          </div>
        ))}
      </section>

      {/* Actions Section */}
      <section>
        <h2>Actions</h2>
        <button>Search Voter</button>
      </section>
    </div>
  );
}

export default Dashboard;
