const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = await new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response
        .status(401)
        .json({ error: `cannot delete blogs not created by ${user.username}` })
    }
  }
)

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...body },
    { new: true }
  )
  response.json(blog.toJSON())
})

module.exports = blogsRouter
