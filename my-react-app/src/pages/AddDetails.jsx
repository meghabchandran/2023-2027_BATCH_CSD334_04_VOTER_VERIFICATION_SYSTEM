import { useNavigate } from "react-router-dom";

function AddDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#B9D6F2]/20 p-6">
      <div className="w-full max-w-lg bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-10 rounded-2xl shadow-xl animate-fadeIn">

        {/* Header row with title and back button */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-[#061A40]">
            Add Details
          </h2>
          <button
            type="button"
            onClick={() => navigate("/login-data-entry")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0353A4]/25 bg-white/50 backdrop-blur text-[#0353A4] text-sm font-medium hover:bg-[#0353A4]/10 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0353A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Data Entry Login
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-1">
          Manage booth and voter registrations
        </p>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate("/add-booth")}
            className="w-full bg-[#0353A4] hover:bg-[#003559] text-white py-3 rounded-lg transition"
          >
            Add Booth Details
          </button>
          <button
            onClick={() => navigate("/add-voter")}
            className="w-full bg-[#006DAA] hover:bg-[#003559] text-white py-3 rounded-lg transition"
          >
            Add Voter Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDetails;