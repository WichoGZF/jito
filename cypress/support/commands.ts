//@ts-nocheck
/// <reference types="cypress" />

Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-cy="navbar-signin_button"]').click()
    cy.get('[data-cy="username-input"]').type(username)
    cy.get('[data-cy="password-input"]').type(password)
    cy.get('[data-cy="login-button"]').click()
})

Cypress.Commands.add('register', (username, password, email) => {
    cy.get('[data-cy="navbar-signup_button"]').click()
    cy.get('[data-cy="username-input"]').type(username)
    cy.get('[data-cy="password-input"]').type(password)
    cy.get('[data-cy="confirm-input"]').type(password)
    cy.get('[data-cy="email-input"]').type(email)
    cy.get('[data-cy="register-button"]').click()
})

Cypress.Commands.add('addTask', () => {
    cy.get('[data-cy="add-new-task-button"]').click()
    cy.get('[data-cy="task-input-name"]').type("Test task")
    cy.get('[data-cy="task-input-description"]').type("Test description")
    cy.get('[data-cy="blocks-input"]').type("3")
    cy.get('[data-cy="save-task-button"]').click()
})