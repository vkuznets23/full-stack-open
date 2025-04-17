import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage'
import Home from './pages/Home'
import Registration from './pages/RegisterPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
