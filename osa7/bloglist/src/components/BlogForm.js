import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, setMessage, setType, blogFormRef }) => {
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await blogService.create({ title, author, url })
      blogFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${author} added`)
      setType('success')
      blogService.getAll().then((blogs) => setBlogs(blogs))
      setTimeout(() => {
        setMessage(null)
        setType('primary')
      }, 5000)
    } catch (exception) {
      setMessage("oops, something wen't wrong while creating a new blog")
      setType('danger')
      setTimeout(() => {
        setMessage(null)
        setType('primary')
      }, 5000)
    }
  }

  return (
    <Form onSubmit={handleCreate}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={title || ''}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Label>author:</Form.Label>
        <Form.Control
          id="author"
          type="text"
          value={author || ''}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Label>url:</Form.Label>
        <Form.Control
          id="url"
          type="url"
          value={url || ''}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button id="create" type="submit">
          Create
        </Button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm
