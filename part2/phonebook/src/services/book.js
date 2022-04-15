import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons/';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const update = (id, obj) => {
    const request = axios.put(`${baseUrl}/${id}`, obj);
    return request.then(response => response.data);
}

const create = obj => {
    const request = axios.post(baseUrl, obj);
    return request.then(response => response.data);
}

const deleteEntry = id => {
    const request = axios.delete(baseUrl + id);
    return request.then();
}

export default {
    getAll, create, update, deleteEntry
}