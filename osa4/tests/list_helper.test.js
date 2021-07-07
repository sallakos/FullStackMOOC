const listHelper = require('../utils/list_helper')
const blogLists = require('./blogList')

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blogLists.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has no blogs total likes is 0', () => {
    const result = listHelper.totalLikes(blogLists.emptyList)
    expect(result).toBe(0)
  })

  test('total likes calculated correctly', () => {
    const result = listHelper.totalLikes(blogLists.blogs)
    expect(result).toBe(36)
  })

  test('if no likes has been defined the total likes are calculated correctly', () => {
    const result = listHelper.totalLikes(blogLists.blogsWithNoLikes)
    expect(result).toBe(9)
  })
})

describe('favourite blog', () => {
  test('when list has only one blog it is the favourite', () => {
    const result = listHelper.favouriteBlog(blogLists.listWithOneBlog)
    expect(result).toEqual(blogLists.listWithOneBlog[0])
  })

  test('when list has no blogs returns undefined', () => {
    const result = listHelper.favouriteBlog(blogLists.emptyList)
    expect(result).toBe(undefined)
  })

  test('favourite blog found correctly from a long list of blogs', () => {
    const result = listHelper.favouriteBlog(blogLists.blogs)
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    })
  })

  test('if no likes has been defined the favourite is found', () => {
    const result = listHelper.favouriteBlog(blogLists.blogsWithNoLikes)
    expect(result).toEqual({
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    })
  })
})

describe('most blogs', () => {
  test('when list has only one blog it returns the author of it', () => {
    const result = listHelper.mostBlogs(blogLists.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('when list has no blogs returns undefined', () => {
    const result = listHelper.mostBlogs(blogLists.emptyList)
    expect(result).toBe(undefined)
  })

  test('author with most blogs found correctly from a long list of blogs', () => {
    const result = listHelper.mostBlogs(blogLists.blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })

  test('if two authors have same amount of blogs first occurence is found', () => {
    const result = listHelper.mostBlogs(blogLists.blogsWithNoLikes)
    expect(result).toEqual({
      author: 'Michael Chan',
      blogs: 2,
    })
  })
})
