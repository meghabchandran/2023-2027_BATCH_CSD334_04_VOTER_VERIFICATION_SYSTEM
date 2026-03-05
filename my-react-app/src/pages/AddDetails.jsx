import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useEffect } from "react";

function AddDetails() {
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
    <div className="min-h-screen flex items-center justify-center bg-[#B9D6F2]/20 p-6">
      <div className="w-full max-w-lg bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-10 rounded-2xl shadow-xl animate-fadeIn">
        {/* Header row with title and back button */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold text-[#061A40]">Add Details</h2>
          <button
            type="button"
            onClick={() => logout(navigate)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-1">
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
