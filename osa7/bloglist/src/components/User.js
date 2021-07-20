import React from 'react'

export const User = ({ user }) =>
  user ? (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.length > 0 ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.title}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <div>no added blogs</div>
      )}
    </>
  ) : null
