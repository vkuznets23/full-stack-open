import axios from 'axios'
const BaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    return axios.get(BaseUrl)
}

export default { getAll }