import axios from 'axios'

const baseUrl = 'http://localhost:3002/api'

const axiosInstance = axios.create({
  baseURL: baseUrl,
})

const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/login', { username, password })
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data?.error || err.message
  }
}

const register = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/users', { username, password })
    return response.data
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response?.data?.error || err.message
  }
}

export default { login, register }
