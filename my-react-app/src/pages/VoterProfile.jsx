// src/pages/VoterProfile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VoterProfile({ voter }) {
  const navigate = useNavigate();
  const [status] = useState(
    voter.has_voted ? "VOTED" : "Not Verified"
  );

  return (
    <div className="min-h-screen bg-[#B9D6F2]/30 flex items-start justify-center p-8">

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#006DAA]/30 shadow-sm p-6 hover:bg-[#eef4fb] hover:shadow-md transition-all duration-300">

        {/* Section Header */}
        <div className="flex items-center mb-6">
          <div className="w-1.5 h-6 bg-[#0353A4] rounded-full mr-3"></div>
          <h2 className="text-xl font-semibold text-[#061A40]">
            Voter Details
          </h2>
        </div>

        {/* Voter Information */}
        <div className="space-y-4 text-[#061A40]">
          <div className="flex justify-between border-b border-[#006DAA]/20 pb-2">
            <span className="font-medium">Name</span>
            <span>{voter.name}</span>
          </div>

          <div className="flex justify-between border-b border-[#006DAA]/20 pb-2">
            <span className="font-medium">Voter ID</span>
            <span>{voter.voter_id}</span>
          </div>

          <div className="flex justify-between border-b border-[#006DAA]/20 pb-2">
            <span className="font-medium">Has Voted</span>
            <span>{voter.has_voted ? "Yes" : "No"}</span>
          </div>

          {/* Status Chip */}
          <div className="flex justify-between items-center pt-2">
            <span className="font-medium">Status</span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                voter.has_voted
                  ? "bg-[#003559] text-white"
                  : "bg-[#0353A4]/10 text-[#0353A4]"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Verify Button */}
        {!voter.has_voted && (
          <div className="mt-8 text-right">
            <button
              onClick={() => navigate(`/verify/${voter.voter_id}`)}
              className="bg-[#0353A4] hover:bg-[#003559] text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              Verify Face
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoterProfile;