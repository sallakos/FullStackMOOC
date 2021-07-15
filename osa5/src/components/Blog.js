import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div style={{ border: 'solid 2px black', padding: '5px', margin: '5px 0' }}>
      {blog.title}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      <div style={{ display: showDetails ? 'block' : 'none' }}>
        <div>{blog.url || null}</div>
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

export default Blog
