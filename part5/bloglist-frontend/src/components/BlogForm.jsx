import React from 'react'
import { useState } from 'react'
export default function BlogForm({ createBlog, updateNotification }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBLog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      await createBlog(blogObject)
      // const returnedBlog = await blogService.create(blogObject)
      // setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      updateNotification(`a new blog ${title} by ${author} added`, 'success')
      // blogFormRef.current.toggleVisibility()
    } catch (error) {
      updateNotification('Error adding blog', error)
    }
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