import Notification from './Notification'
import { Link } from 'react-router-dom'
export default function Home({ blogs, notification, notificationType }) {
  return (
    <div>
      <Notification message={notification} type={notificationType} />
      <h2>blogs</h2>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <p>{blog.title} by {blog.author}</p>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}