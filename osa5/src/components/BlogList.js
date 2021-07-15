import React, { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = ({ user, setUser, setMessage, setType }) => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        blogService.getAll().then((blogs) => setBlogs(blogs))
        setMessage(`blog ${blog.title} by ${blog.author} deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setMessage("oops, something wen't wrong while trying to delete blog")
      setType('error')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }

  return (
    <>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          setBlogs={setBlogs}
          setMessage={setMessage}
          setType={setType}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      <br />
      <br />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            loggedUser={user}
            blog={blog}
            handleDelete={handleDelete}
          />
        ))}
    </>
  )
}

export default BlogList
