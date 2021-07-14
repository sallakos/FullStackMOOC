import React, { useEffect, useState } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <div>
      <Notification message={message} type={type} />
      {user ? (
        <BlogList
          user={user}
          setUser={setUser}
          setMessage={setMessage}
          setType={setType}
        />
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
