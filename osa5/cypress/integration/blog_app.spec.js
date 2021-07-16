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
})
