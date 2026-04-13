import { Link } from 'react-router-dom'
export default function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav>
      <Link to="/">home </Link>
      {isLoggedIn && <Link to="/create-blog" style= { { marginLeft: '10px' } }>create blog </Link>}
      {/* add space between them  */}
      {!isLoggedIn && <Link to="/login" style= { { marginLeft: '10px' } }>login </Link>}
      {isLoggedIn && <Link to="/" onClick={handleLogout} style= { { marginLeft: '10px' } }>logout </Link>}
    </nav>
  )
}
