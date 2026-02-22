import mockBooths from "../mocks/mockbooth";
import mockCandidates from "../mocks/mockcandidates";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const boothId = localStorage.getItem("boothId");
  const booth = mockBooths.find((b) => b.booth_id === boothId);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#B9D6F2]/30 px-4 py-6 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-8 space-y-8 border border-[#006DAA]/20 shadow-[0_10px_30px_rgba(3,83,164,0.08)]">
        <div className="flex items-center justify-between pb-4 border-b border-[#0353A4]">
          <h1 className="text-3xl font-bold text-[#0353A4] tracking-tight">
            Polling Booth Dashboard
          </h1>
        </div>
        {/* Booth Details Section */}
        <section className="bg-[#B9D6F2]/40 border border-[#006DAA] rounded-2xl p-6">
          <div className="h-1.5 w-20 bg-[#0353A4] rounded-full mb-3"></div>

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
        <section className="bg-[#B9D6F2]/40 border border-[#006DAA] rounded-2xl p-6 shadow-sm mt-6">
          <h2 className="text-lg font-semibold tracking-tight text-[#061A40] mb-4">
            Candidates
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {mockCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="
                bg-white
                border border-[#006DAA]/30
                rounded-xl
                p-5
                shadow-sm
                hover:bg-[#eef4fb]
                hover:shadow-md
                transition-all duration-300
                "
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full border-2 border-[#0353A4]"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[#061A40]">
                      {candidate.name}
                    </h3>
                    <p className="text-sm uppercase tracking-wide text-[#006DAA]">
                      {candidate.party}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <img
                    src={candidate.partyLogo}
                    alt={`${candidate.party} logo`}
                    className="w-8 h-8"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Actions Section */}
        <section className="rounded-xl p-5 border border-[#d8dced] bg-white shadow-sm">
          <div className="h-1.5 w-20 bg-[#0353A4] rounded-full mb-3"></div>

          <h2 className="text-lg font-semibold tracking-tight text-[#32292f] mb-4">
            Actions
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/voters")}
              className="px-6 py-2.5 bg-[#0353A4] hover:bg-[#003559] text-white font-medium rounded-lg shadow-sm transition"
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
