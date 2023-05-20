//@ts-nocheck

describe('Tests task related functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000')
    cy.login(Cypress.env('username'), Cypress.env('password'))
  })

  it('Adds a new normal task', () => {
    cy.addTask()
  })

  it('Edits a task', () => {
    cy.addTask()
    cy.get('[data-cy="task-list"]').last().then(($task) => {
      $task.get('[data-cy="task-options-menu"]').click()
      $task.get('[data-cy="task-options-menu-edit"]').click()
      $task.get('[data-cy="task-input-name"]').clear().type("Test task edited")
      $task.get('[data-cy="task-input-description"]').clear().type("Test description edited")
      $task.get('[data-cy="save-task-button"]').click()
    })
  })

  it('Deletes an existing task', () => {
    cy.addTask()
    cy.get('[data-cy="task-list"]').last().then(($task) => {
      $task.get('[data-cy="task-options-menu"]').click()
      $task.get('[data-cy="task-options-menu-delete"]').click()
    })
  })
})