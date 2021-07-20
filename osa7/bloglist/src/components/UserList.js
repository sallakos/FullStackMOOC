import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      {users.length > 0 ? (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs created</th>
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
        </Table>
      ) : null}
    </>
  )
}

export default UserList
