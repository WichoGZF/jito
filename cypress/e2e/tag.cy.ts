//@ts-nocheck

describe('Tests tag related functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000')
    })

    it('Adds a new tag', () => {
        cy.addTask()
        cy.get('[data-cy="task-list"]').last().then(($task) => {
            $task.get('[data-cy="task-options-menu"]').click()
            $task.get('[data-cy="task-options-menu-edit"]').click()
            $task.get('[data-cy="tag-chip"]').click()
            $task.get('[data-cy="add-tag-button"]').click()
            $task.get('[data-cy="add-tag-input"]').type("Test tag")
            $task.get('[data-cy="add-tag-save-button"]').click()
        })
    })

    it('Deletes a tag', () => {
        cy.addTask()
        cy.get('[data-cy="task-list"]').last().then(($task) => {
            $task.get('[data-cy="task-options-menu"]').click()
            $task.get('[data-cy="task-options-menu-edit"]').click()
            $task.get('[data-cy="tag-chip"]').click()
            cy.get('[data-cy="tag-list"]').last().then(($tag) => {
                $tag.get('[data-cy="tag-open-edit"]').click()
                $tag.get('[data-cy="tag-delete-open-button"]').click()
                $tag.get('[data-cy="tag-delete-button"]').click()
            })
        })
    })

    it('Edits a tag name', () => {
        cy.addTask()
        cy.get('[data-cy="task-list"]').last().then(($task) => {
            $task.get('[data-cy="task-options-menu"]').click()
            $task.get('[data-cy="task-options-menu-edit"]').click()
            $task.get('[data-cy="tag-chip"]').click()
            cy.get('[data-cy="tag-list"]').last().then(($tag) => {
                $tag.get('[data-cy="tag-open-edit"]').click()
                $tag.get('[data-cy="tag-edit-name-input"]').clear().type("Test tag edited")
                $tag.get('[data-cy="tag-save-edit-button"]').click()
            })
        })
    })

    it('Edits a tag color', () => {
        cy.addTask()
        cy.get('[data-cy="task-list"]').last().then(($task) => {
            $task.get('[data-cy="task-options-menu"]').click()
            $task.get('[data-cy="task-options-menu-edit"]').click()
            $task.get('[data-cy="tag-chip"]').click()
            cy.get('[data-cy="tag-list"]').last().then(($tag) => {
                $tag.get('[data-cy="tag-open-edit"]').click()
                $tag.get('[data-cy="tag-open-color-picker"]').click()
                //how do we change the color?
                $tag.get('[data-cy="tag-save-edit-button"]').click()
            })
        })
    })
})