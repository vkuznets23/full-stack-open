import LoginForm from '../components/Login'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
      <p>Already have account?</p>
      <Link to="/register">Go to Register Page</Link>
    </div>
  )
}

export default Login
