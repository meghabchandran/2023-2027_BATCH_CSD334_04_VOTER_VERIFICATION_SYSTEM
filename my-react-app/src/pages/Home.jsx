import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/search")
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Voter Verification System</h1>

      <input placeholder="Username" />
      <br /><br />

      <input placeholder="Password" type="password" />
      <br /><br />

      <input placeholder="Booth ID" />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Home
