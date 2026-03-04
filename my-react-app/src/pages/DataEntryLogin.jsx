import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../mocks/image/login.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password || !mobile || !otp) {
      setError("All fields required");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          mobile_number: mobile,
          otp_code: otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("role", data.role);
        navigate("/add-details");
      } else {
        setError(data.detail || "Invalid OTP or login failed");
        setSuccessMsg("");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  const handleSendOtp = async () => {
    if (!mobile) {
      setError("Mobile number required");
      return;
    }

    try {
      setError("");

      const res = await fetch("http://127.0.0.1:8000/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_number: mobile }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setSuccessMsg("OTP sent successfully!");
        setError("");
      } else {
        setError(data.detail || "Failed to send OTP");
      }
    } catch (err) {
      setError("Server error");
    }
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

        {/* Back to Home button — sits above the card, aligned left */}
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0353A4]/25 bg-white/50 backdrop-blur text-[#0353A4] text-sm font-medium hover:bg-[#0353A4]/10 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0353A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </button>
        </div>

        {/* Login card */}
        <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-[#0353A4]/30 p-8 rounded-2xl shadow-xl animate-fadeIn">
          <h2 className="text-2xl font-semibold tracking-tight text-[#061A40]">
            Data Entry Operator Login
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to manage voter details and booth information.
          </p>

          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium text-[#061A40]">Username</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none transition focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#061A40]">Password</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 outline-none transition focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#061A40]">Mobile Number</label>
              <input
                disabled={otpSent}
                className={`w-full mt-1 px-3 py-2 rounded-lg border ${otpSent ? "bg-gray-100" : "border-gray-300"}`}
                type="text"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            {successMsg && (
              <p className="text-green-600 text-sm font-medium">{successMsg}</p>
            )}

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                className="w-full mt-4 bg-[#006DAA] hover:bg-[#0353A4] text-white py-2.5 rounded-lg font-medium transition"
              >
                Send OTP
              </button>
            ) : (
              <div className="animate-fadeIn space-y-4 mt-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div>
                  <label className="text-sm font-semibold text-[#006DAA]">
                    Enter 4-Digit Code
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-[#006DAA] text-center text-xl tracking-widest outline-none"
                    type="text"
                    maxLength="4"
                    placeholder="----"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}

                <button
                  onClick={handleLogin}
                  className="w-full bg-[#0353A4] hover:bg-[#003559] text-white font-medium rounded-lg py-2.5 transition"
                >
                  Verify & Login
                </button>

                <button
                  onClick={() => {
                    setOtpSent(false);
                    setSuccessMsg("");
                    setError("");
                  }}
                  className="w-full text-xs text-gray-500 hover:text-blue-600 transition"
                >
                  Entered wrong number? Edit Mobile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;