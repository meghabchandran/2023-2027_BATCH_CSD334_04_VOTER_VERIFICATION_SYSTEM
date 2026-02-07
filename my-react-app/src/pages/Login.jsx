function Login() {
  return (
    <div>
      <h2>Voter Login</h2>

      <div>
        <label>Username</label>
        <br />
        <input type="text" placeholder="Enter username" />
      </div>

      <br />

      <div>
        <label>Password</label>
        <br />
        <input type="password" placeholder="Enter password" />
      </div>

      <br />

      <div>
        <label>Booth ID</label>
        <br />
        <input type="text" placeholder="Enter booth ID" />
      </div>

      <br />

      <button>Login</button>
    </div>
  );
}

export default Login;
