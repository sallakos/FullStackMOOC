import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  if (!token) {
    const user = localStorage.getItem('loggedUser')
    token = `bearer ${JSON.parse(user).token}` || null
  }

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newBlog) => {
  if (!token) {
    const user = localStorage.getItem('loggedUser')
    token = `bearer ${JSON.parse(user).token}` || null
  }

  const config = { headers: { Authorization: token } }

  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

const remove = async (id) => {
  if (!token) {
    const user = localStorage.getItem('loggedUser')
    token = `bearer ${JSON.parse(user).token}` || null
  }

  const config = { headers: { Authorization: token } }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// eslint-disable-next-line
export default { getAll, create, update, remove, setToken }
