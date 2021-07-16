import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ loggedUser, blog, handleLike, handleDelete }) => {
  const { title, url, author, likes, user } = blog
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div
      style={{ border: 'solid 2px black', padding: '5px', margin: '5px 0' }}
      className="blog"
    >
      {title}, {author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      <div
        style={{ display: showDetails ? 'block' : 'none' }}
        className="blogDetails"
      >
        <div>{url || null}</div>
        <div>
          likes {likes} <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{user && user.name}</div>
        {user && loggedUser.username === blog.user.username ? (
          <button onClick={() => handleDelete(blog)}>remove</button>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
