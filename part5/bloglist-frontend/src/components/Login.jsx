import React from 'react'
import { useState } from 'react'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
export default function Login({ handleLogin, notification, notificationType }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await handleLogin(username, password)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (error) {
      console.log('error logging in', error)
    }
  }
  return (<>
    <Notification message={notification} type={notificationType} />
    <h2>log in to application</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <br />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <br />
      <button type="submit">login</button>
    </form>
  </>)
}