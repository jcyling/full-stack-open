/* eslint-disable no-undef */
describe('', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root', password: 'sekret', name: 'superuser'
    })
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
  })

  it('login unsuccessful', function () {
    cy.get('#username').type('awefwe')
    cy.get('#password').type('efa')
    cy.contains('login').click()
    cy.contains('Wrong username or password')
  })

  it('login successfully', function () {
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.contains('login').click()
    cy.contains('superuser logged in')
  })

  describe('logged in tests', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'root', password: 'sekret'
      }).then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('create a new blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a good day')
      cy.get('#author').type('dumbledore')
      cy.get('#url').type('https')
      cy.contains('create').click()

      cy.contains('a good day')
      cy.get('.message').contains('Added successfully')
    })

    describe('and a blog entry exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('a good day')
        cy.get('#author').type('dumbledore')
        cy.get('#url').type('https')
        cy.contains('create').click()

        cy.contains('new blog').click()
        cy.get('#title').type('awaits')
        cy.get('#author').type('early bird')
        cy.get('#url').type('https')
        cy.contains('create').click()
      })

      it('delete a blog', function () {
        cy.contains('a good day').parent().find('button').click()
        cy.contains('a good day').parent().contains('remove').click()
        cy.get('a good day').should('not.exist')
      })

      it('like a blog', function () {
        cy.contains('a good day').parent().find('button').click()
        cy.contains('a good day').parent().find('.btn-like').click()
        cy.contains('a good day').parent().contains('Likes: 1')
      })

      it('blog are ordered by likes', function () {
        cy.contains('awaits').parent().find('button').click()
        cy.contains('awaits').parent().find('.btn-like').click()
        cy.contains('awaits').parent().find('.btn-like').click()
        cy.get('.blog').eq(0).should('contain', 'awaits')
        cy.get('.blog').eq(1).should('contain', 'a good day')
      })
    })


  })

})