import { useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import { Login } from './components/Login'
import NewBook from './components/NewBook'
import { Notification } from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <button onClick={() => setPage('add')}>add book</button>
        ) : null}
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <button
            onClick={() => {
              logout()
              setPage('login')
            }}
          >
            logout
          </button>
        )}
      </div>

      <Notification errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        token={token}
        setError={setErrorMessage}
      />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add' && token} />

      <Login
        show={page === 'login'}
        setError={setErrorMessage}
        setPage={setPage}
        setToken={setToken}
      />
    </div>
  )
}

export default App
