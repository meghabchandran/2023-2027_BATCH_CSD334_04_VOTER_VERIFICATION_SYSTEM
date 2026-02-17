import mockBooths from "../mocks/mockbooth";
import mockCandidates from "../mocks/mockcandidates";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const boothId = localStorage.getItem("boothId");
  const booth = mockBooths.find((b) => b.booth_id === boothId);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Polling Booth Dashboard
        </h1>

        {/* Booth Details Section */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700">Booth Details</h2>
          <p>
            <strong className="text-gray-600">Booth ID:</strong> {boothId}
          </p>
          <p>
            <strong className="text-gray-600">Booth Name:</strong>{" "}
            {booth?.booth_name}
          </p>
          <p>
            <strong className="text-gray-600">Constituency:</strong>{" "}
            {booth?.constituency}
          </p>
        </section>

        {/* Candidates Section */}
        <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Candidates
          </h2>

          <div className="space-y-4">
            {mockCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {candidate.name}
                    </p>

                    <p className="text-gray-600 text-sm">{candidate.party}</p>
                  </div>
                </div>

                {/* RIGHT SIDE (Party Logo) */}
                <img
                  src={candidate.partyLogo}
                  alt={candidate.party}
                  className="w-10 h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Actions Section */}
        <section>
          {/* <h2>Actions</h2> */}
          <button
            onClick={() => navigate("/search")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search Voter
          </button>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
