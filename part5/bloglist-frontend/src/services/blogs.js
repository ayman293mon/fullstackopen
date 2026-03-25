import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'
let token = null
const setToken = newToken => {
  console.log('setting token to', `bearer ${newToken}`)
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const request = await axios.get(`${baseUrl}/bloglist`, {
    headers: { Authorization: token }
  })
  return request.data // return the array of blogs
}
const create = async (newObject) => {
  console.log('creating blog with token', token)
  const request = await axios.post(`${baseUrl}/bloglist`, newObject, {
    headers: { Authorization: token }
  } )
  return request.data // return the created blog object
}
const login = async (credentials) => {
  const request = await axios.post(`${baseUrl}/login`, credentials)
  const { AccessToken } = request.data
  return {
    username: credentials.username,
    token: AccessToken
  }
}

export default { getAll, create, setToken, login }