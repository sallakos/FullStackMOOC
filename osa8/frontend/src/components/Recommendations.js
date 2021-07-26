import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../queries'

const Recommendations = ({ show, favoriteGenre }) => {
  const [genre, setGenre] = useState(null)
  const [getBooks, booksByGenre] = useLazyQuery(ALL_BOOKS_BY_GENRE)

  useEffect(() => {
    setGenre(favoriteGenre)
    genre ? getBooks({ variables: { genre } }) : getBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteGenre])

  if (!show) {
    return null
  }

  const books = booksByGenre?.data?.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      {genre ? (
        <div>
          books in your favorite genre <strong>{genre}</strong>
        </div>
      ) : null}
      {booksByGenre.loading ? (
        <div>loading...</div>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default Recommendations
