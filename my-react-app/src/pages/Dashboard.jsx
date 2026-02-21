import mockBooths from "../mocks/mockbooth";
import mockCandidates from "../mocks/mockcandidates";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const boothId = localStorage.getItem("boothId");
  const booth = mockBooths.find((b) => b.booth_id === boothId);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6">
      {/* Workspace Surface */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-5 sm:p-6 space-y-5 sm:space-y-6 border border-[#d8dced]">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#d8dced]">
          <h1 className="text-3xl font-bold text-[#32292f] tracking-tight">
            Polling Booth Dashboard
          </h1>
        </div>

        {/* Booth Details Section */}
        <section className="bg-[#d1e3dd]/70 rounded-2xl p-6 border border-[#cddfd8]">
          <div className="h-1.5 w-20 bg-[#5762d5] rounded-full mb-3"></div>

          <h2 className="text-lg font-semibold tracking-tight text-[#32292f]">
            Booth Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <p>
              <strong className="text-[#575366]">Booth ID:</strong> {boothId}
            </p>
            <p>
              <strong className="text-[#575366]">Booth Name:</strong>{" "}
              {booth?.booth_name}
            </p>
            <p>
              <strong className="text-[#575366]">Constituency:</strong>{" "}
              {booth?.constituency}
            </p>
          </div>
        </section>

        {/* Candidates Section */}
        <section className="bg-white rounded-2xl border border-[#d8dced] p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold tracking-tight text-[#32292f]">
            Candidates
          </h2>

          <p className="text-sm text-[#575366] mb-4">
            List of candidates assigned to this booth
          </p>

          <div className="space-y-4">
            {mockCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-[#e2e5f2] hover:bg-[#eef1fa] hover:shadow-sm transition"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-[#32292f]">
                      {candidate.name}
                    </p>
                    <p className="text-[#575366] text-sm">{candidate.party}</p>
                  </div>
                </div>

                {/* RIGHT SIDE (Party Logo) */}
                <img
                  src={candidate.partyLogo}
                  alt={candidate.party}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Actions Section */}
        <section className="rounded-xl p-5 border border-[#d8dced] bg-white shadow-sm">
          <div className="h-1.5 w-20 bg-[#5762d5] rounded-full mb-3"></div>

          <h2 className="text-lg font-semibold tracking-tight text-[#32292f] mb-4">
            Actions
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/voters")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 bg-[#5762d5] hover:bg-[#4b54c4] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition"
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
