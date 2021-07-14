import React from 'react'

const Notification = ({ message, type }) =>
  message ? (
    <div
      style={{
        border: `solid 3px ${type === 'error' ? 'red' : 'green'}`,
        padding: '10px',
        borderRadius: '5px',
        background: 'lightgrey',
      }}
    >
      {message}
    </div>
  ) : null

export default Notification
