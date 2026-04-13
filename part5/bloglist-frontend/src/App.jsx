import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Login from './components/login'
import Home from './components/Home'
import Navbar from './components/Navbar'
import {
  Routes, Route, useMatch
} from 'react-router-dom'
export default function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')
  const blogFormRef = useRef()
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null
  const compareByLikes = (a, b) => b.likes - a.likes
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
        blogs.sort(compareByLikes)
        setBlogs(blogs)
        console.log('fetched blogs', blogs)
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
      setIsLoggedIn(true)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async(username, password) => {
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
      setIsLoggedIn(true)
      updateNotification('login successful', 'success')
    } catch (error) {
      console.log('wrong credentials', error)
      updateNotification('wrong username or password', 'error')
      console.log(user)
      throw new Error('wrong username or password')
    }

  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setIsLoggedIn(false)
    updateNotification('logout successful', 'success')
  }
  const createBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    return returnedBlog
  }
  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
      let newBlogs = [...blogs]
      for (let i = 0; i < blogs.length; ++i) {
        if (blogs[i].id === blog.id) {
          newBlogs[i].likes = updatedBlog.likes
          break
        }
      }
      newBlogs.sort(compareByLikes)
      setBlogs(newBlogs)
      updateNotification(`liked ${blog.title} by ${blog.author}`, 'success')
    } catch (error) {
      console.log('error updating blog', error)
      updateNotification('error updating blog', 'error')
    }
  }
  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      updateNotification(`deleted ${blog.title} by ${blog.author}`, 'success')
    } catch (error) {
      console.log('error deleting blog', error)
      updateNotification('error deleting blog', 'error')
    }
  }
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          <Home blogs={blogs} notification={notification} notificationType={notificationType} user={user} updateNotification={updateNotification} createBlog={createBlog} handleLike={handleLike} handleDelete={handleDelete} blogFormRef={blogFormRef} isLoggedIn={isLoggedIn} />
        } />
        <Route path="/login" element={
          <Login handleLogin={handleLogin} notification={notification} notificationType={notificationType} />
        } />
        <Route path="/blogs/:id" element={
          <Blog blog={blog} isLoggedIn={isLoggedIn} handleLike={handleLike} handleDelete={handleDelete} updateNotification={updateNotification} notification={notification} notificationType={notificationType} />
        } />
        <Route path="/create-blog" element = {
          <BlogForm updateNotification={updateNotification} createBlog={createBlog} isLoggedIn={isLoggedIn} />
        } />
      </Routes>
    </div>
  )
}
