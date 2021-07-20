let token

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    token = body.token
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addUser', () => {
  const user = {
    name: 'Testi Devaaja',
    username: 'sale',
    password: 'sala',
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
  const blog = {
    title,
    author,
    url,
  }
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs/',
    body: blog,
    auth: { bearer: token },
  })
})
