const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)

const favouriteBlog = (blogs) =>
  blogs.reduce((prev, current) => {
    const prevLikes = prev?.likes || 0
    const currentLikes = current?.likes || 0
    return prevLikes > currentLikes ? prev : current
  }, undefined)

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author)
  const authorWithMostBlogs = _.maxBy(
    Object.entries(_.countBy(authors, (author) => author)).map((item) => {
      const [author, blogs] = item
      return { author, blogs }
    }),
    (o) => o.blogs
  )
  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
}
