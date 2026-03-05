import mockBooths from "../mocks/mockbooth";
import mockCandidates from "../mocks/mockcandidates";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const boothId = localStorage.getItem("boothId");
  const booth = mockBooths.find((b) => b.booth_id === boothId);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#B9D6F2]/40 px-4 py-6 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-8 space-y-8 border border-[#006DAA]/20 shadow-[0_10px_30px_rgba(3,83,164,0.08)]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between pb-4 border-b border-[#0353A4]">
          <h1 className="text-3xl font-bold text-[#0353A4] tracking-tight">
            Polling Booth Dashboard
          </h1>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#B9D6F2]/40 border border-[#006DAA]/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#006DAA]"></span>
            <p className="text-sm font-medium text-[#061A40]">Booth Active</p>
          </div>
        </div>

        {/* ── Navigation buttons ── */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0353A4]/25 bg-white/70 text-[#0353A4] text-sm font-medium hover:bg-[#0353A4]/10 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0353A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0353A4]/25 bg-white/70 text-[#0353A4] text-sm font-medium hover:bg-[#0353A4]/10 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="#0353A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Booth Officer Login
          </button>
        </div>

        {/* ── Booth Details Section ── */}
        <section className="bg-[#B9D6F2]/40 border border-[#006DAA]/30 rounded-2xl p-6 shadow-[0_2px_10px_rgba(3,83,164,0.06)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1.5 w-12 bg-[#0353A4] rounded-full"></div>
            <h2 className="text-xl font-heading font-bold text-[#061A40]">
              Booth Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#4B5563]">
            <p>
              <span className="font-semibold text-[#061A40]">Booth ID:</span>{" "}
              {boothId}
            </p>
            <p>
              <span className="font-semibold text-[#061A40]">Booth Name:</span>{" "}
              {booth?.booth_name}
            </p>
            <p>
              <span className="font-semibold text-[#061A40]">
                Constituency:
              </span>{" "}
              {booth?.constituency}
            </p>
          </div>
        </section>

        {/* ── Candidates Section ── */}
        <section className="bg-[#B9D6F2]/40 border border-[#006DAA]/30 rounded-2xl p-6 shadow-[0_2px_10px_rgba(3,83,164,0.06)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1.5 w-12 bg-[#0353A4] rounded-full"></div>
            <h2 className="text-xl font-heading font-bold text-[#061A40]">
              Candidates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {mockCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white border border-[#006DAA]/30 rounded-xl p-5 shadow-sm hover:bg-[#eef4fb] hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full border-2 border-[#0353A4]"
                  />
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-[#061A40]">
                      {candidate.name}
                    </h3>
                    <p className="text-sm uppercase tracking-wide text-[#006DAA] mt-1">
                      {candidate.party}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
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

        {/* ── Actions Section ── */}
        <section className="rounded-xl p-5 border border-[#d8dced] bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1.5 w-12 bg-[#0353A4] rounded-full"></div>
            <h2 className="text-xl font-heading font-bold text-[#061A40]">
              Actions
            </h2>
          </div>

          <button
            onClick={() => navigate("/search")}
            className="px-6 py-2.5 bg-[#0353A4] hover:bg-[#003559] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Search Voter
          </button>
        </section>

      </div>
    </div>
  );
}

export default Dashboard;
