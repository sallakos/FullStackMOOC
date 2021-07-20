import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import blogService from '../services/blogs'
import login from '../services/login'

const LoginForm = ({ setUser, setMessage, setType }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setType('danger')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit">login</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default LoginForm
