import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {
  hideNotification,
  setNotification,
} from '../reducers/notificationReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(addAnecdote(content))
    dispatch(setNotification(`you added '${content}'`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}
