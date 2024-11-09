import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

//returns an object
const personsService = {
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
}

export default personsService;