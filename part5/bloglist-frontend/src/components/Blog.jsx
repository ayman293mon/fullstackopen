import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
const Blog = ({ blog, handleLike, handleDelete, isLoggedIn, updateNotification, notification, notificationType }) => {
  console.log('blog', blog)
  const navigate = useNavigate()
  if (!blog) {
    return null
  }
  const handleLikeClick = (e) => {
    e.preventDefault()
    if (!isLoggedIn) {
      updateNotification('You must be logged in to like a blog', 'error')
      return
    }
    handleLike(blog)
  }
  const handleDeleteClick = (e) => {
    e.preventDefault()
    if (!isLoggedIn) {
      updateNotification('You must be logged in to delete a blog', 'error')
      return
    }
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }
    handleDelete(blog)
    navigate('/')
  }
  return (
    <div>
      <Notification message={notification} type={notificationType} />
      <h1>
        {blog.author}: {blog.title}
      </h1>
      <a href={blog.url} target="_blank">
        {blog.url}
      </a>
      <br />
      <p>
        likes {blog.likes} <button onClick={handleLikeClick}>like</button>
      </p>
      <p>added by {blog.author}</p>
      <button onClick={handleDeleteClick}>remove</button>
    </div>
  )
}
export default Blog