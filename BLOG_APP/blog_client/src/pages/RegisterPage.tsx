import RegistrationForm from '../components/RegistrationForm'
import { Link } from 'react-router-dom'

const Registration = () => {
  return (
    <div>
      <h1>Registration Page</h1>
      <RegistrationForm />
      <p>Dont have account?</p>
      <Link to="/login">Go to Login Page</Link>
    </div>
  )
}

export default Registration
