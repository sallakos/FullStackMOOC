import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ADD_NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    default:
      return state
  }
}

export const addAnecdote = (content) => ({
  type: 'ADD_NEW',
  data: asObject(content),
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (id) => ({ type: 'VOTE', data: { id } })

export default reducer
