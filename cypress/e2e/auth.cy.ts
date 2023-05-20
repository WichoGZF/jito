//@ts-nocheck

describe('Checks registration and authorization workflows', () => {
    beforeEach(() => { 
        cy.visit('http://localhost:8000')
    })
    it('Registers an user', () => {
        cy.register(Cypress.env('username'), Cypress.env('password'), Cypress.env('email'))
    })
    it('Logins the user', () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
    })
})