import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import blogService from '../services/blogs'

const Blog = ({ loggedUser, blog, setBlogs, setMessage, setType }) => {
  if (!blog) {
    return null
  }

  const { title, url, author, likes, user } = blog

  const handleLike = async (blog) => {
    await blogService.update(blog.id, {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
    })
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id)
        blogService.getAll().then((blogs) => setBlogs(blogs))
        setMessage(`blog ${blog.title} by ${blog.author} deleted`)
        setType('success')
        setTimeout(() => {
          setMessage(null)
          setType('primary')
        }, 5000)
      }
    } catch (exception) {
      setMessage("oops, something wen't wrong while trying to delete blog")
      setType('danger')
      setTimeout(() => {
        setMessage(null)
        setType('primary')
      }, 5000)
    }
  }

  return (
    <div>
      <h2>
        {title}, {author}
      </h2>
      <Container className="blogDetails">
        {url ? (
          <div>
            <a href={url}>{url}</a>
          </div>
        ) : null}
        <div>
          likes {likes}{' '}
          <Button size="sm" className="like" onClick={() => handleLike(blog)}>
            like
          </Button>
        </div>
        {user && user.name ? <div>added by {user.name}</div> : null}
        {user && loggedUser.username === blog.user.username ? (
          <Button variant="danger" size="sm" onClick={() => handleDelete(blog)}>
            remove
          </Button>
        ) : null}
      </Container>
    </div>
  )
}

const Container = styled.div`
  border: solid 2px;
  border-radius: 4px;
  padding: 10px;
`

export default Blog
