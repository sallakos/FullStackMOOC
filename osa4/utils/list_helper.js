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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}
