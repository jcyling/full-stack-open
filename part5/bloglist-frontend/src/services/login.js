import axios from 'axios'
const baseUrl = '/api/login'

// Make POST request to get login token
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }