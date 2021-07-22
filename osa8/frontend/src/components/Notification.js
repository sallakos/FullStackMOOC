import React from 'react'

export const Notification = ({ errorMessage }) =>
  errorMessage ? <div style={{ color: 'red' }}>{errorMessage}</div> : null
