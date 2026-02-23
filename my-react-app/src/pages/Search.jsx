import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVoterById } from "../api/voterApi";
import VoterProfile from "./VoterProfile";

function Search() {
  const [voterId, setVoterId] = useState("");
  const [voter, setVoter] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError("");
    setVoter(null);

    if (!voterId) {
      setError("Please enter a Voter ID");
      return;
    }

    try {
      const data = await getVoterById(voterId);
      setVoter(data);
    } catch (err) {
      setError("Voter not found");
    }
  };

  const handleVerifyClick = () => {
    if (voter) {
      navigate(`/verify/${voter.voter_id}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">

      {/* Search Voter Box */}
      <div className="w-full max-w-2xl bg-[#B9D6F2]/40 border border-[#006DAA]/30 rounded-2xl p-8 shadow-[0_2px_10px_rgba(3,83,164,0.06)]">

        {/* Heading */}
        <h1 className="text-2xl font-semibold tracking-tight text-[#061A40] mb-2">
          Search Voter
        </h1>

        <p className="text-sm text-[#003559] mb-6">
          Enter the Voter ID to retrieve voter details securely.
        </p>

        {/* Search Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            className="
              flex-1
              px-4
              py-3
              rounded-lg
              border border-[#006DAA]/30
              focus:outline-none
              focus:ring-2
              focus:ring-[#0353A4]
              transition
            "
          />

          <button
            onClick={handleSearch}
            className="
              px-6
              py-3
              bg-[#0353A4]
              hover:bg-[#003559]
              text-white
              rounded-lg
              transition
            "
          >
            Search
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 mt-4 text-sm font-medium">
            {error}
          </p>
        )}

        {/* Voter Details */}
        {voter && (
          <div className="mt-8 bg-white border border-[#006DAA]/30 rounded-2xl p-6 shadow-sm hover:bg-[#eef4fb] hover:shadow-md transition-all duration-300">
            
            <h2 className="text-lg font-semibold text-[#061A40] mb-4">
              Voter Details
            </h2>

            <VoterProfile voter={voter} />

            <button
              onClick={handleVerifyClick}
              className="
                w-full
                mt-6
                py-3
                bg-[#0353A4]
                hover:bg-[#003559]
                text-white
                rounded-lg
                transition
              "
            >
              Verify Face
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;