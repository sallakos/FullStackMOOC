describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.addUser()
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'sale', password: 'sala' })
      cy.contains('Testi Devaaja logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('sale')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('.notification').contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'sale', password: 'sala' })
    })

    it('A blog can be created', function () {
      const title = 'A new blog'
      const author = 'Author von New'
      cy.contains('create new blog').click()
      cy.get('#title').type(title)
      cy.get('#author').type(author)
      cy.get('#url').type('https://google.com')
      cy.get('#create').click()

      cy.get('.notification').contains(`a new blog ${title} by ${author} added`)
      cy.contains(`${title}, ${author}`)
    })

    it('A blog can be liked', function () {
      cy.addBlog({ title: 'A new blog', author: 'Author von New' })
      cy.contains('view').click()
      cy.contains('likes 0').click()
      cy.contains('like').click()
      cy.contains('likes 1').click()
      cy.contains('like').click()
      cy.contains('likes 2').click()
    })

    it('A blog can be deleted', function () {
      cy.addBlog({ title: 'A new blog', author: 'Author von New' })
      cy.contains('A new blog, Author von New')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.blogCred').should('not.exist')
    })
  })

  describe('Blogs are ordered correctly', function () {
    beforeEach(function () {
      cy.login({ username: 'sale', password: 'sala' })
      cy.addBlog({ title: 'A new blog', author: 'Author von New' })
      cy.addBlog({ title: 'A blog to like', author: 'Author von New' })
      cy.addBlog({ title: 'A blog not to like', author: 'Author von New' })
      cy.visit('http://localhost:3000')
    })

    it('Blogs are ordered', function () {
      cy.contains('A new blog, Author von New')
      cy.contains('A blog to like, Author von New')
      cy.contains('A blog not to like, Author von New')

      cy.get('.showDetails').click({ multiple: true })

      cy.contains('A new blog, Author von New')
        .parent()
        .find('button.like')
        .as('newBlogLikeButton')

      cy.contains('A blog to like, Author von New')
        .parent()
        .find('button.like')
        .as('blogToLikeButton')

      cy.get('@newBlogLikeButton').click()
      cy.contains('A new blog, Author von New').parent().contains('likes 1')
      cy.get('@blogToLikeButton').click()
      cy.contains('A blog to like, Author von New').parent().contains('likes 1')
      cy.get('@blogToLikeButton').click()
      cy.contains('A blog to like, Author von New').parent().contains('likes 2')
      cy.get('@blogToLikeButton').click()
      cy.contains('A blog to like, Author von New').parent().contains('likes 3')

      cy.get('.blog').eq(0).contains('A blog to like, Author von New')
      cy.get('.blog').eq(1).contains('A new blog, Author von New')
      cy.get('.blog').eq(2).contains('A blog not to like, Author von New')
    })
  })
})
