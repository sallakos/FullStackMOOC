const listHelper = require('../utils/list_helper')
const blogLists = require('../tests/blogList')

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
