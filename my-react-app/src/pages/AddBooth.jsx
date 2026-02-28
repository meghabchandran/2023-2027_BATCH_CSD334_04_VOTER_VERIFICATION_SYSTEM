import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBooth() {
  const [boothId, setBoothId] = useState("");
  const [location, setLocation] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("booth_id", boothId);
    formData.append("location", location);
    formData.append("officer_name", officerName);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#B9D6F2]/20 p-6">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-semibold text-[#061A40]">
          Add Booth
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Booth ID"
            value={boothId}
            onChange={(e) => setBoothId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Officer Name"
            value={officerName}
            onChange={(e) => setOfficerName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#0353A4] hover:bg-[#003559] text-white py-2.5 rounded-lg transition"
          >
            Submit
          </button>

          {message && (
            <p className="text-center text-sm mt-2 text-[#061A40]">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddBooth;