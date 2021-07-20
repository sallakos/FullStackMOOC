import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { User } from './components/User'
import userService from './services/users'
import blogService from './services/blogs'
import Blog from './components/Blog'
import { Menu } from './components/Menu'

const App = () => {
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
    blogService.getAll().then((blogs) => setBlogs(blogs))

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const userRouteMatch = useRouteMatch('/users/:id')
  const blogRouteMatch = useRouteMatch('/blogs/:id')
  const userToShow = userRouteMatch
    ? users.find((u) => u.id === userRouteMatch.params.id)
    : null
  const blogToShow = blogRouteMatch
    ? blogs.find((b) => b.id === blogRouteMatch.params.id)
    : null

  return (
    <div className="container">
      <Notification message={message} type={type} />
      {user ? (
        <>
          <Menu name={user.name} handleLogout={handleLogout} />
          <h1>Blog app</h1>
          <Switch>
            <Route path="/users/:id">
              <User user={userToShow} />
            </Route>
            <Route path="/users">
              <UserList users={users} />
            </Route>
            <Route path="/blogs/:id">
              <Blog
                loggedUser={user}
                blog={blogToShow}
                setBlogs={setBlogs}
                setMessage={setMessage}
                setType={setType}
              />
            </Route>
            <Route path="/">
              <BlogList
                blogs={blogs}
                setBlogs={setBlogs}
                user={user}
                setUser={setUser}
                setMessage={setMessage}
                setType={setType}
              />
            </Route>
          </Switch>
        </>
      ) : (
        <LoginForm
          setUser={setUser}
          setMessage={setMessage}
          setType={setType}
        />
      )}
    </div>
  )
}

export default App
