import { useNavigate } from "react-router-dom";

function AddDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#B9D6F2]/20 p-6">
      <div className="w-full max-w-lg bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-10 rounded-2xl shadow-xl animate-fadeIn">

        <h2 className="text-2xl font-semibold text-[#061A40] text-center">
          Add Details
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
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