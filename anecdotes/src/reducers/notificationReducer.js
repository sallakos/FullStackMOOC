const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const setNotification = (content) => ({
  type: 'SET_NOTIFICATION',
  data: content,
})

export default reducer
