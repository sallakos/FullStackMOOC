import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'

const BlogList = ({ user, setUser, setMessage, setType }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <BlogForm setBlogs={setBlogs} setMessage={setMessage} setType={setType} />
      <br />
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default BlogList
