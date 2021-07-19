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

export const setNotification = (content, time) => {
  return async (dispatch) => {
    await content
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, visible: true },
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export const hideNotification = () => ({
  type: 'HIDE_NOTIFICATION',
})

export default reducer
