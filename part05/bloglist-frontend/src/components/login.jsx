const Login = (props) => {
  return (
    <div>
      {/* Display error message if login fails */}
      {props.errorMessage && <div style={{ color: 'red' }}>{props.errorMessage}</div>}
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={props.password}
            password="Password"
            onChange={({ target }) => props.setPassword(target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;