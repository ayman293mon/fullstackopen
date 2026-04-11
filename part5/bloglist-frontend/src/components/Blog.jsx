import { useState } from "react"
const Blog = ({ blog, handleLike, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLikeClick = (e) => {
    e.preventDefault()
    handleLike(blog)
  }
  const handleDeleteClick = (e) => {
    e.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{detailsVisible ? 'hide' : 'view'}</button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <span>{blog.likes} likes</span> 
          <button onClick={handleLikeClick}>like</button>
          <div>added by {blog.user.name}</div>
          <button onClick={handleDeleteClick}>delete</button>
        </div>
      )}
    </div>
  )
}
export default Blog