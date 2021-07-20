const initialState = { content: '', visible: false }
let timeoutID

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      timeoutID = undefined
      return { content: '', visible: false }
    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return async (dispatch) => {
    await content
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content, visible: true },
    })
    timeoutID = setTimeout(() => {
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
