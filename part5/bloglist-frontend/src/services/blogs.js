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
const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/bloglist/${id}`, {
    headers: { Authorization: token }
  })
  return request.data
}
const login = async (credentials) => {
  const request = await axios.post(`${baseUrl}/login`, credentials)
  const { AccessToken } = request.data
  return {
    username: credentials.username,
    token: AccessToken
  }
}
const update = async (id, updatedObject) => {
  const request = await axios.put(`${baseUrl}/bloglist/${id}`, updatedObject, {
    headers: { Authorization: token }
  })
  return request.data
}
export default { getAll, create, setToken, login, update, remove }