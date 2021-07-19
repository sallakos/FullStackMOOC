const initialState = { content: '', visible: false }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return { content: '', visible: false }
    default:
      return state
  }
}

export const setNotification = (content) => ({
  type: 'SET_NOTIFICATION',
  data: { content, visible: true },
})

export const hideNotification = () => ({
  type: 'HIDE_NOTIFICATION',
})

export default reducer
