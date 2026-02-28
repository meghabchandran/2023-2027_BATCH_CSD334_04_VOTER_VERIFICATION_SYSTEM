// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../mocks/image/login.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setError("");
    if (!mobile) {
      setError("Mobile number required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_number: mobile }),
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setSuccessMsg("OTP sent successfully — enter the 4-digit code.");
        setError("");
      } else {
        setError(data.detail || "Failed to send OTP");
      }
    } catch (err) {
      setError("Server error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    if (!username || !password || !mobile || !otp) {
      setError("All fields required");
      return;
    }

    try {
      setLoading(true);
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
        localStorage.setItem("role", data.role || "data-entry");
        navigate("/add-details"); // keep existing redirect
      } else {
        setError(data.detail || "Invalid OTP or login failed");
        setSuccessMsg("");
      }
    } catch (err) {
      setError("Server error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  // helper to accept numbers only for OTP
  const handleOtpChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOtp(val);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#B9D6F2]/20 font-body">
      {/* LEFT: illustration panel */}
      <div className="hidden md:flex relative items-center justify-center bg-[#003559] text-white overflow-hidden">
        <img
          src={loginImage}
          alt="Voting Illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[#061A40]/70 z-0" />

        <div className="relative z-10 max-w-md px-12">
          <h1 className="text-4xl font-heading font-extrabold tracking-tight leading-tight">
            Managing the Democratic Process
          </h1>
          <div className="h-1.5 w-16 bg-[#0353A4] rounded-full mt-4 mb-4" />
          <p className="text-[#B9D6F2] italic">
            Streamlining secure voter verification.
          </p>
        </div>
      </div>

      {/* RIGHT: form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/85 backdrop-blur-md border border-[#006DAA]/20 p-8 md:p-10 rounded-3xl shadow-[0_10px_30px_rgba(3,83,164,0.08)]">
          <h2 className="text-2xl font-heading font-bold text-[#061A40]">
            Data Entry Operator Login
          </h2>

          <p className="text-sm text-[#4B5563] mt-2">
            Enter credentials to manage voter records securely.
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
                className="w-full mt-2 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none transition"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                aria-label="username"
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
                className="w-full mt-2 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#006DAA] focus:ring-2 focus:ring-[#006DAA]/20 outline-none transition"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                aria-label="password"
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="text-sm font-medium text-[#061A40]"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                disabled={otpSent}
                className={`w-full mt-2 px-4 py-2.5 rounded-lg border ${
                  otpSent ? "bg-gray-100 border-gray-200" : "border-gray-300"
                } outline-none transition`}
                type="tel"
                inputMode="tel"
                placeholder="+91 98765 43210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                aria-label="mobile number"
              />
            </div>

            {/* feedback */}
            {successMsg && (
              <p className="text-sm text-green-600 font-medium">{successMsg}</p>
            )}
            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            {/* Action / OTP area */}
            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full mt-2 bg-[#0353A4] hover:bg-[#003559] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                aria-disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <div className="mt-4 p-6 bg-[#B9D6F2]/30 border border-[#006DAA]/20 rounded-2xl space-y-4">
                <div>
                  <label className="text-sm font-semibold text-[#0353A4]">
                    Enter 4-Digit Verification Code
                  </label>
                  <input
                    className="w-full mt-2 px-4 py-3 rounded-lg border border-[#006DAA]/30 text-center text-xl tracking-widest focus:border-[#0353A4] focus:ring-2 focus:ring-[#0353A4]/20 outline-none transition"
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={4}
                    aria-label="otp code"
                    placeholder="----"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleLogin}
                    className="w-full bg-[#0353A4] hover:bg-[#003559] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Verify & Login
                  </button>

                  <button
                    onClick={() => {
                      setOtpSent(false);
                      setSuccessMsg("");
                      setError("");
                      setOtp("");
                    }}
                    className="w-full text-xs text-[#006DAA] hover:underline"
                  >
                    Edit Mobile Number
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
