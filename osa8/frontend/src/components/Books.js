import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const [getBooks, booksByGenre] = useLazyQuery(ALL_BOOKS_BY_GENRE)

  const showBooksByGenre = (genre) => {
    setGenre(genre)
    genre ? getBooks({ variables: { genre } }) : getBooks()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => showBooksByGenre(null), [])

  useEffect(() => {
    if (!genre) {
      setGenres(
        Array.from(
          new Set(booksByGenre.data?.allBooks?.map((b) => b.genres).flat())
        )
      )
    }
  }, [genre, booksByGenre])

  if (!props.show) {
    return null
  }

  const books = booksByGenre?.data?.allBooks

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      ) : null}
      {booksByGenre.loading ? (
        <div>loading...</div>
      ) : (
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
      )}
      {genres.length > 0 ? (
        <>
          {genres.map((genre) => (
            <button key={genre} onClick={() => showBooksByGenre(genre)}>
              {genre}
            </button>
          ))}
          <button onClick={() => showBooksByGenre(null)}>all genres</button>
        </>
      ) : null}
    </div>
  )
}

export default Books
