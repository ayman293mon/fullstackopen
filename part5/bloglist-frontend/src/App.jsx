import { useState, useEffect, use } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
export default function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')
  const updateNotification = (message, type) => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 5000)
  }
  useEffect(() => {
    (async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        console.log('error fetching blogs', error)
        updateNotification('error fetching blogs', 'error')
      }
    })()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handelLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    const credentials = {
      username: username,
      password: password
    }
    try {
      const { token, username } = await blogService.login(credentials)
      console.log('login successful', token, username)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify({ token: token, username }))
      blogService.setToken(token)
      setUser({ token: token, username })
      setUsername('')
      setPassword('')
      updateNotification('login successful', 'success')
    } catch (error) {
      console.log('wrong credentials')
      updateNotification('wrong username or password', 'error')
    }
  }
  const handelLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    updateNotification('logout successful', 'success')
  }
  if (user === null) {
      return (<>
        <Notification message={notification} type={notificationType} />
        <h2>log in to application</h2>
        <form onSubmit={handelLogin}>
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

  return (
    <div>
      <Notification message={notification} type={notificationType} />
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      <button onClick={handelLogout}>logout</button>  
      <br />
      <br />
      <BlogForm blogs={blogs} setBlogs={setBlogs} updateNotification={updateNotification} />
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
    