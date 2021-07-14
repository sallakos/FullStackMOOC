import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, setMessage, setType }) => {
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${author} added`)
      blogService.getAll().then((blogs) => setBlogs(blogs))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage("oops, something wen't wrong while creating a new blog")
      setType('error')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        title:{' '}
        <input
          type="text"
          value={title || ''}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          value={author || ''}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          type="url"
          value={url || ''}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
