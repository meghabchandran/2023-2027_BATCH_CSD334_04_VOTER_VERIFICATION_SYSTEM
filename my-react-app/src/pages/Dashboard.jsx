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
        {/* Header */}
        <div className="flex items-center justify-between ">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Polling Booth Dashboard
          </h1>
        </div>

        {/* Booth Details Section */}
        <section className="bg-teal-50 rounded-2xl p-6 border border-gray-200">
          <div className="h-1 w-16 bg-indigo-600 rounded-full mb-3"></div>

          <h2 className="text-lg font-semibold text-gray-800 tracking-tight mb-4">
            Booth Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
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
          </div>
        </section>

        {/* Candidates Section */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight mb-4">
            Candidates
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            List of candidates assigned to this booth
          </p>

          <div className="space-y-4">
            {mockCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-sm transition"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-sm"
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
        <section className="rounded-xl p-6 border border-gray-200 bg-white shadow-sm">
          <div className="h-1 w-16 bg-indigo-600 rounded-full mb-3"></div>
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight mb-4">
            Actions
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/voters")}
              className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition
"
            >
              Search Voter
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
