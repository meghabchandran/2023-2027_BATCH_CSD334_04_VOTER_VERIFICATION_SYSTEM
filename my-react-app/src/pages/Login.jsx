import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../mocks/image/login.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [boothId, setBoothId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password || !boothId) {
      setError("All fields are required");
      return;
    }

    setError("");
    localStorage.setItem("boothId", boothId);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#B9D6F2]/20">
      {/* ── Left illustration panel ── */}
      <div className="hidden md:flex relative items-center justify-center bg-[#003559] text-white overflow-hidden">
        <img
          src={loginImage}
          alt="Voting Illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[#061A40]/70 z-0" />
        <div className="relative z-10 max-w-sm text-left px-12 animate-slideUp">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Managing the Democratic Process
          </h1>
          <p className="mt-4 text-[#B9D6F2] text-base italic">
            Streamlining secure voter verification.
          </p>
        </div>
      </div>

      {/* ── Right login panel ── */}
      <div className="flex flex-col items-center justify-center p-6 gap-4">
        {/* Back to Home button — above the card, aligned left */}
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0353A4]/25 bg-white/50 backdrop-blur text-[#0353A4] text-sm font-medium hover:bg-[#0353A4]/10 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="#0353A4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Login card */}
        <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-8 rounded-2xl shadow-xl animate-fadeIn">
          <h2 className="text-2xl font-semibold tracking-tight text-[#061A40]">
            Booth Officer Login
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to access the booth dashboard.
          </p>

          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium text-[#061A40]">
                Username
              </label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none transition focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#061A40]">
                Password
              </label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none transition focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#061A40]">
                Booth ID
              </label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none transition focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20"
                type="text"
                placeholder="Booth ID"
                value={boothId}
                onChange={(e) => setBoothId(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleLogin}
              className="w-full mt-4 bg-[#0353A4] hover:bg-[#003559] text-white font-medium rounded-lg py-2.5 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
