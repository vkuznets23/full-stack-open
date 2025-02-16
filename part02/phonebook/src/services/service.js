import axios from 'axios'

const baseUrl = 'http://localhost:3001/contacts'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error('Error fetching contacts:', error)
    throw error
  }
}

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  } catch (error) {
    console.error('Error creating contact:', error)
    throw error
  }
}

const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`)
  } catch (error) {
    console.error('Error deleting contact:', error)
    throw error
  }
}

export default {
  getAll,
  create,
  remove,
}
