import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    // navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#B9D6F2]/20">
      <div className="hidden md:flex items-center justify-center bg-[#003559]">
        {/* Visual area placeholder */}
      </div>

      <div className="flex items-center justify-center p-6">
        {/* Login form will go here */}
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-[#061A40]">
            Voter Login
          </h2>

          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium text-[#061A40]">
                Username
              </label>

              <input
                className="
                w-full
                mt-1
                px-3
                py-2
                rounded-lg
                border border-gray-300
                outline-none
                transition
                focus:border-[#006DAA]
                focus:ring-2 focus:ring-[#006DAA]/20
                "
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
                className="
                w-full
                mt-1
                px-3
                py-2
                rounded-lg
                border border-gray-300
                outline-none
                transition
                focus:border-[#006DAA]
                focus:ring-2 focus:ring-[#006DAA]/20
                "
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
                className="
                w-full
                mt-1
                px-3
                py-2
                rounded-lg
                border border-gray-300
                outline-none
                transition
                focus:border-[#006DAA]
                focus:ring-2 focus:ring-[#006DAA]/20
                "
                type="text"
                placeholder="Booth ID"
                value={boothId}
                onChange={(e) => setBoothId(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              onClick={handleLogin}
              className="
              w-full
              mt-4
              bg-[#0353A4]
              hover:bg-[#003559]
              text-white
              font-medium
              rounded-lg
              py-2.5
              transition
              "
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
