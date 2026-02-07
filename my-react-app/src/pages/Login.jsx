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
    <div>
      <h2>Voter Login</h2>

      <div>
        <label>Username</label>
        <br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Booth ID</label>
        <br />
        <input
          type="text"
          placeholder="Booth ID"
          value={boothId}
          onChange={(e) => setBoothId(e.target.value)}
        />
      </div>

      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
