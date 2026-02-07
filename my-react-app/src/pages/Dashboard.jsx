import mockBooths from "../mock/mockbooth";

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
        <p>(Candidates list will appear here)</p>
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
