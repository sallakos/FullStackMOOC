import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <>
      <h2>users</h2>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  )
}

export default UserList
