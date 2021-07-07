const listHelper = require('../utils/list_helper')
const blogLists = require('../tests/blogList')

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
