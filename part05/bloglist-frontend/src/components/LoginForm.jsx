const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
