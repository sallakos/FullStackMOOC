import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, type }) =>
  message ? <Alert variant={type}>{message}</Alert> : null

export default Notification
