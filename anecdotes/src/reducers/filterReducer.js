const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (content) => ({
  type: 'SET_FILTER',
  data: content,
})

export default reducer
