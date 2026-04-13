import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function BlogForm({ createBlog, updateNotification, isLoggedIn }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()
  if (!isLoggedIn) {
    updateNotification('You must be logged in to create a blog', 'error')
    navigate('/')
    return null
  }
  const addBLog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      await createBlog(blogObject)
      setTitle('')
      setAuthor('')
      setUrl('')
      updateNotification(`a new blog ${title} by ${author} added`, 'success')
    } catch (error) {
      updateNotification('Error adding blog', error)
    }
    navigate('/')
  }
  return (
    <form onSubmit={addBLog}>
      <label htmlFor="title">title</label>
      <input
        id="title"
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <label htmlFor="author">author</label>
      <input
        id="author"
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      <label htmlFor="url">url</label>
      <input
        id="url"
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type="submit">create</button>
    </form>
  )
}