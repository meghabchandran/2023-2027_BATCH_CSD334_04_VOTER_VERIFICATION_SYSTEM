import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../utils/auth";

function AddBooth() {
  const [boothId, setBoothId] = useState("");
  const [location, setLocation] = useState("");
  const [boothName, setBoothName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("booth_id", boothId);
    formData.append("location", location);
    formData.append("booth_name", boothName);

    const res = await fetch("http://127.0.0.1:8000/api/booths/add", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message || data.detail);

    if (res.ok) {
      setTimeout(() => navigate("/add-details"), 1500);
    }
  };

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
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-8 rounded-2xl shadow-xl">
        {/* Header row with title and back button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#061A40]">Add Booth</h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/add-details")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0353A4]/25 bg-white/50 backdrop-blur text-[#0353A4] text-sm font-medium hover:bg-[#0353A4]/10 transition"
            >
              ← Add Details
            </button>
            <button
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Booth ID */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Booth ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. B01"
              value={boothId}
              onChange={(e) => setBoothId(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-medium text-gray-600">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Full address of the booth"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">
              Booth Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Name of the polling booth"
              value={boothName}
              onChange={(e) => setBoothName(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none"
            />
          </div>

          {/* Required fields note */}
          <p className="text-xs text-gray-400">
            <span className="text-red-500">*</span> Required fields
          </p>

          <button
            type="submit"
            className="w-full bg-[#0353A4] hover:bg-[#003559] text-white py-2.5 rounded-lg font-medium transition"
          >
            Submit Booth Details
          </button>

          {message && (
            <p
              className={`text-center text-sm mt-2 ${
                message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddBooth;
