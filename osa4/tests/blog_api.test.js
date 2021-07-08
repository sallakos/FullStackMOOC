const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('data is valid', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('right amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs identified by id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((item) => expect(item.id).toBeDefined())
  })
})

describe('addition of a new blog', () => {
  test('blogs can be added', async () => {
    const newBlog = {
      title: 'A whole new blog',
      author: 'Author New',
      url: 'http://google.com',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain('A whole new blog')
  })

  test('new blog with no likes get 0 likes', async () => {
    const newBlog = {
      title: 'A blog with no likes',
      author: 'Author New',
      url: 'http://facebook.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const addedBlog = _.find(blogsAtEnd, { title: 'A blog with no likes' })
    expect(addedBlog.likes).toEqual(0)
  })

  test('new blog with no author cannot be added', async () => {
    const newBlog = {
      title: 'A blog with no author',
      url: 'http://facebook.com',
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const addedBlog = _.find(blogsAtEnd, { title: 'A blog with no author' })
    expect(addedBlog).toBeUndefined()
  })

  test('new blog with no title cannot be added', async () => {
    const newBlog = {
      author: "He Who Hasn't Named His Blog",
      url: 'http://facebook.com',
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const addedBlog = _.find(blogsAtEnd, {
      author: "He Who Hasn't Named His Blog",
    })
    expect(addedBlog).toBeUndefined()
  })
})

describe('deletion of a blog', () => {
  test('existing blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}${_.random(20)}`).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
