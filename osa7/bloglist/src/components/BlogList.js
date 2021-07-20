import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = ({ blogs, setBlogs, setMessage, setType }) => {
  const blogFormRef = useRef()

  return (
    <>
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
          <div
            style={{
              border: 'solid 2px black',
              padding: '5px',
              margin: '5px 0',
            }}
            key={blog.id}
            className="blog"
          >
            <span className="blogCred">
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}, {blog.author}
              </Link>
            </span>
          </div>
        ))}
    </>
  )
}

export default BlogList
