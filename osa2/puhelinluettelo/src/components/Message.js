import React from 'react'

const Message = ({ message, error }) => {

  let color = 'green'

  if (error) {
    color = 'red'
  }

  const messageStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  }

  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )

}

export default Message