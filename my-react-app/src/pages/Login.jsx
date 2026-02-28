import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../mocks/image/login.jpg";

export default function Login() {
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
    <div className="min-h-screen grid md:grid-cols-2 bg-[#B9D6F2]/30 font-body">
      {/* ───── LEFT PANEL ───── */}
      <div className="hidden md:flex relative items-center justify-center bg-[#003559] text-white overflow-hidden">
        <img
          src={loginImage}
          alt="Voting Illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-[#061A40]/70"></div>

        <div className="relative z-10 max-w-md px-12">
          <h1 className="text-4xl font-heading font-extrabold tracking-tight leading-tight">
            Managing the Democratic Process
          </h1>

          <div className="h-1.5 w-16 bg-[#0353A4] rounded-full mt-4 mb-4"></div>

          <p className="text-[#B9D6F2] italic">
            Streamlining secure voter verification.
          </p>
        </div>
      </div>

      {/* ───── RIGHT PANEL ───── */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/85 backdrop-blur-md border border-[#006DAA]/20 p-10 rounded-3xl shadow-[0_10px_30px_rgba(3,83,164,0.08)]">
          <h2 className="text-2xl font-heading font-bold text-[#061A40]">
            Booth Officer Login
          </h2>

          <p className="text-sm text-[#4B5563] mt-2">
            Enter your credentials to access the booth dashboard.
          </p>

          <div className="space-y-5 mt-8">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-[#061A40]"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#061A40]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none transition"
              />
            </div>

            {/* Booth ID */}
            <div>
              <label
                htmlFor="boothId"
                className="text-sm font-medium text-[#061A40]"
              >
                Booth ID
              </label>
              <input
                id="boothId"
                type="text"
                value={boothId}
                onChange={(e) => setBoothId(e.target.value)}
                className="w-full mt-2 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full mt-4 bg-[#0353A4] hover:bg-[#003559] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
