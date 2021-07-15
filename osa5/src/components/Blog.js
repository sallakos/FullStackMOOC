import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ loggedUser, blog, handleDelete }) => {
  const { id, title, url, author, likes, user } = blog
  const [showDetails, setShowDetails] = useState(false)
  const [blogLikes, setBlogLikes] = useState(likes || 0)

  const handleLike = async () => {
    await blogService.update(id, {
      title,
      url,
      author,
      likes: blogLikes + 1,
      user: user?.id || null,
    })
    setBlogLikes(blogLikes + 1)
  }

  return (
    <div style={{ border: 'solid 2px black', padding: '5px', margin: '5px 0' }}>
      {title}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      <div style={{ display: showDetails ? 'block' : 'none' }}>
        <div>{url || null}</div>
        <div>
          likes {blogLikes} <button onClick={handleLike}>like</button>
        </div>
        <div>{author}</div>
        {loggedUser.username === blog.user?.username ? (
          <button onClick={() => handleDelete(blog)}>remove</button>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
