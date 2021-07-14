import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    await blogService.create({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
