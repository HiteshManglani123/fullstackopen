import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (personObject) => {
    const result = axios.post(baseUrl, personObject)
    return result.then(response => response.data)
}

const deletePerson = (personObject) => {
    const result = axios.delete(`${baseUrl}/${personObject.id}`)
    return result.then(response => response.data)
}

const updatePerson = (personObject) => {
    const result = axios.put(`${baseUrl}/${personObject.id}`, personObject)
    return result.then(response => response.data)
}

const PersonCrud = {
    getAll,
    createPerson,
    deletePerson,
    updatePerson
}

export default PersonCrud