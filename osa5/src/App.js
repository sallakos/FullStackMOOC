import React, { useEffect, useState } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <div>
      {user ? (
        <BlogList user={user} setUser={setUser} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  )
}

export default App
