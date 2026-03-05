import mockBooths from "../mocks/mockbooth";
import mockCandidates from "../mocks/mockcandidates";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useEffect } from "react";

function Dashboard() {
  const boothId = localStorage.getItem("boothId");
  const booth = mockBooths.find((b) => b.booth_id === boothId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/home", { replace: true });
    }
  }, []);
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
    return () => {
      window.onpopstate = null;
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#B9D6F2]/40 px-4 py-6 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-8 space-y-8 border border-[#006DAA]/20 shadow-[0_10px_30px_rgba(3,83,164,0.08)]">
        {/* ── Header ── */}
        <div className="flex items-center justify-between pb-4 border-b border-[#0353A4]">
          <h1 className="text-4xl font-bold text-[#0353A4] tracking-tight">
            Polling Booth Dashboard
          </h1>

          {/* Right side: badge + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#B9D6F2]/50 border border-[#006DAA]/40 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#006DAA]"></span>
              <p className="text-sm font-medium text-[#061A40]">Booth Active</p>
            </div>

            <button
              type="button"
              onClick={() => logout(navigate)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* ── Booth Details Section ── */}
        <section className="bg-[#B9D6F2]/40 border border-[#006DAA]/30 rounded-2xl p-6 shadow-[0_2px_10px_rgba(3,83,164,0.06)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1.5 w-12 bg-[#0353A4] rounded-full"></div>
            <h2 className="text-xl font-semibold tracking-tight text-[#061A40]">
              Booth Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            {[
              { label: "Booth ID", value: boothId },
              { label: "Booth Name", value: booth?.booth_name },
              { label: "Constituency", value: booth?.constituency },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white rounded-xl px-4 py-3 border border-[#006DAA]/20"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {label}
                </p>
                <p className="text-sm font-semibold text-[#061A40] mt-0.5">
                  {value || "—"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Candidates Section ── */}
        <section className="bg-[#B9D6F2]/40 border border-[#006DAA]/30 rounded-2xl p-6 shadow-[0_2px_10px_rgba(3,83,164,0.06)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1.5 w-12 bg-[#0353A4] rounded-full"></div>
            <h2 className="text-xl font-semibold tracking-tight text-[#061A40]">
              Candidates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {mockCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white border border-[#006DAA]/30 rounded-xl p-5 shadow-sm hover:bg-white hover:border-[#0353A4] hover:shadow-[0_0_0_3px_rgba(3,83,164,0.15)] transition-all duration-300"
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

        {/* ── Actions Section ── */}
        <section className="rounded-xl p-5 border border-[#d8dced] bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1.5 w-12 bg-[#0353A4] rounded-full"></div>
            <h2 className="text-xl font-semibold tracking-tight text-[#061A40]">
              Actions
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/search")}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0353A4] hover:bg-[#003559] text-white font-medium rounded-lg shadow-sm transition"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" />
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Search Voter
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
