import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  const books = result?.data?.allBooks
  const genres = Array.from(new Set(books?.map((b) => b.genres).flat()))

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      ) : null}
      {result.loading ? (
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
              {books
                .filter((b) => (genre ? b.genres.includes(genre) : true))
                .map((b) => (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {genres.map((genre) => (
            <button key={genre} onClick={() => setGenre(genre)}>
              {genre}
            </button>
          ))}
          <button onClick={() => setGenre(null)}>all genres</button>
        </>
      )}
    </div>
  )
}

export default Books
