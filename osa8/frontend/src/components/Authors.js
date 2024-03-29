import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS } from '../queries'
import { EDIT_AUTHOR } from '../mutations'

const Authors = (props) => {
  const queryResult = useQuery(ALL_AUTHORS)

  const [name, setName] = useState(null)
  const [year, setYear] = useState('')

  const [editAuthor, mutationResult] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const authors = queryResult?.data?.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name.label, born: parseInt(year) } })

    setName('')
    setYear('')
  }

  useEffect(() => {
    if (mutationResult?.data?.editAuthor === null) {
      props.setError('author not found')
      setTimeout(() => props.setError(''), 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationResult.data])

  if (!props.show) {
    return null
  }

  const options = (authors || []).map((author) => ({
    value: author.name.toLowerCase().replace(/\s/g, ''),
    label: author.name,
  }))

  return (
    <div>
      <h2>authors</h2>
      {queryResult.loading ? (
        <div>loading...</div>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {authors.map((a) => (
                <tr key={a.name}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {props.token ? (
            <>
              <h3>Set birthyear</h3>
              <form onSubmit={submit}>
                <Select
                  defaultValue={name}
                  onChange={setName}
                  options={options}
                />
                <div>
                  born
                  <input
                    value={year}
                    onChange={({ target }) => setYear(target.value)}
                  />
                </div>
                <button type="submit">update author</button>
              </form>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Authors
