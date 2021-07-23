import { useApolloClient, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import { Login } from './components/Login'
import NewBook from './components/NewBook'
import { Notification } from './components/Notification'
import { USER } from './queries'

const App = () => {
  const user = useQuery(USER, { pollInterval: 500 })

  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const t = localStorage.getItem('books-user-token')
    if (t) {
      setToken(t)
    }
  }, [favoriteGenre])

  useEffect(() => {
    const fg = user?.data?.me?.favoriteGenre
    if (fg) {
      setFavoriteGenre(user.data.me.favoriteGenre)
    }
  }, [user.data])

  const logout = () => {
    setToken(null)
    setFavoriteGenre(null)
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

      <Books show={page === 'books'} favoriteGenre={favoriteGenre} />

      <NewBook show={page === 'add' && token} />

      <Login
        show={page === 'login'}
        setPage={setPage}
        setError={setErrorMessage}
        setToken={setToken}
      />
    </div>
  )
}

export default App
