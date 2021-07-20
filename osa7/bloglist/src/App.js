import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { User } from './components/User'
import userService from './services/users'

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))

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

  const match = useRouteMatch('/users/:id')
  const userToShow = match ? users.find((u) => u.id === match.params.id) : null

  return (
    <div>
      <Notification message={message} type={type} />
      {user ? (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Switch>
            <Route path="/users/:id">
              <User user={userToShow} />
            </Route>
            <Route path="/users">
              <UserList users={users} />
            </Route>
            <Route path="/">
              <BlogList
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
