import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'development'
? 'http://localhost:3002/api/persons' // Local URL for development
:'https://phonebook-toc1.onrender.com/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, persons) => {
    return axios.put(`${baseUrl}/${id}`, persons)
}

//returns an object
const personsService = {
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    update: update,
}

export default personsService;