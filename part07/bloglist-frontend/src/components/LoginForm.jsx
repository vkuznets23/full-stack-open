import PropTypes from 'prop-types'
import { TextField, Button, Box } from '@mui/material'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <Box
    component="form"
    onSubmit={handleLogin}
    sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}
  >
    <TextField
      label="Username"
      variant="outlined"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      autoComplete="username"
      fullWidth
    />
    <TextField
      label="Password"
      type="password"
      variant="outlined"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      autoComplete="current-password"
      fullWidth
    />
    <Button variant="contained" color="primary" type="submit">
      Login
    </Button>
  </Box>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginForm
