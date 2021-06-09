import Blog from '../../src/components/Blog'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('login form can be opened', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })
})

describe('Login', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Hitesh',
      username: 'Purge',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('Purge')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('Purge is logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('Purgeee')
    cy.get('#password').type('passworddd')
    cy.get('#login-button').click()

    cy.contains('Invalid username or password')
  })
})

describe('When logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Hitesh',
      username: 'Purge',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.login({ username: 'Purge', password:'password' })
  })

  it('a blog can be created', function() {
    cy.contains('new blog').click()

    cy.get('#title').type('Nirvanna')
    cy.get('#author').type('Kurt Cobain')
    cy.get('#url').type('nirvanna/com/nl')

    cy.get('#create-blog-button').click()

    cy.contains('Nirvanna Kurt Cobain')
  })

  it('a blog can be liked', function() {
    cy.contains('new blog').click()

    // cy.get('#title').type('Nirvanna')
    // cy.get('#author').type('Kurt Cobain')
    // cy.get('#url').type('nirvanna/com/nl')

    cy.createBlog({ title: 'Nirvanna', author: 'Kurt Cobain', url: 'nirvanna/com/nl' })

    cy.contains('Nirvanna Kurt Cobain')
    cy.get('#view-details-blog').click()
    cy.contains('0')
    cy.get('#like-blog').click()
    cy.contains('1')
  })

  it('a blog can be removed', function() {
    cy.contains('new blog').click()

    cy.createBlog({ title: 'Nirvanna', author: 'Kurt Cobain', url: 'nirvanna/com/nl' })

    cy.contains('Nirvanna Kurt Cobain')
    cy.get('#view-details-blog').click()
    cy.get('#remove-blog').click()
    cy.get('html').should('not.contain', 'Nirvanna Kurt Cobain')
  })

  it.only('blogs are ordered by likes', function() {
    cy.contains('new blog').click()

    cy.createBlog({ title: 'Nirvanna', author: 'Kurt Cobain', url: 'nirvanna/com/nl' })
    cy.createBlog({ title: 'Hunger games', author: 'Candice', url: 'TheMockingBird.com' })
    cy.createBlog({ title: 'The first avenger', author: 'Steve Roger', url: 'Marvelcomics.com' })

    cy.contains('Nirvanna Kurt Cobain')
      .parent()
      .find('#view-details-blog')
      .click()
      .find('button')
      .click()
    cy.contains('Hunger games Candice')
      .parent()
      .find('#view-details-blog')
      .click()
      .find('#like-blog')
      .click()
    cy.contains('The first avenger Steve Roger')
      .parent()
      .find('#view-details-blog')
      .click()
      .find('#like-blog')
      .click()

    cy.get('.blogLikes')
      .then((likes) => {
        console.log(likes)
      })
  })

})