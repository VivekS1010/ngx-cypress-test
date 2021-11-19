/// <reference types="cypress" />


Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('First Office UI Test case to Create Task', () => {
    beforeEach('Visits the staging', () => {
        //Before each test - sign into Aroflo
        //Given that I Click the sign in button on the home page
      cy.visit('https://staging08-office.aroflo.com/')
      cy.get('h1')
            .should('contain', 'Welcome to AroFlo')
        cy.get('#username').type('albertv')
            .should('have.value', 'albertv')
        cy.get('#password').type('servicetrack')
        cy.get(`:nth-child(1) > .afBtn__fill`).click()
    
    })

    describe('Test Scenario 1: Office UI and create new Task', () => {
        // Navigating to the Office UI page and then create new Task
        it.skip('Test Case 1: Click on Create and Click on Task ', () => {
            cy.get('#mainMenuTabCREATE').click()
            cy.contains('Task').click()
            // below will input task name and click submit button to create task
            cy.get('#wrname').type('Test1233')
            cy.get('#_Cust532').type('abcd')
            cy.get('#addrequest__submit').click()
        })
    })

    describe('Test Scenario 2: We need add Text Notes with Sticky option ticked', () => {
        // Nthis will add notes in task also click Sticky option click save it
        it('Test Case 2: create new Notes as Text notes and Save it ', () => {
            cy.get('#mainMenuTabSERVICETRACK').click()
            cy.contains('Current').click()
            // below will input task name and click submit button to create task
            cy.contains('Test1233').click()
            cy.get('#btnAddNoteText').click()
            cy.get('#thisnote').type('test1233333333333')
            cy.get('#NoteSticky').click()
            cy.get('#btnAddNote').click()  
            
         })
    })

    describe('Test Scenario 3: We need add HTML Notes with Sticky option ticked', () => {
        // Nthis will add notes in task also click Sticky option click save it
        it.skip('Test Case 3: create new Notes as Text HTML format and Save it ', () => {
            cy.get('#mainMenuTabSERVICETRACK').click()
            cy.contains('Current').click()
            // below will input task name and click submit button to create task
            cy.contains('Test1233').click()
            cy.get('#btnAddNoteHTML').click()
            cy.get('#cke_thisnote').type('bhjjjkm')
            cy.get('#NoteSticky').click()
            cy.get('#btnAddNote').click()  
            
         })
    })
    describe('Test Scenario 4: EDIT current task and change name', () => {
        // Nthis will add notes in task also click Sticky option click save it
        it.skip('Test Case 4: Edit current task and change title', () => {
            cy.get('#mainMenuTabSERVICETRACK').click()
            cy.contains('Current').click()
            cy.contains('Test1233').click()
            // below will input edit task name and change task type hit Save
            cy.contains('Edit Task Header').click()
            cy.get('#task').type('test2233')
            cy.contains('Task Type').click()
            //cy.get('[name="serviceName"]').contains('Warranty').click()
            cy.get('#btnAddRequest').click()

            
         })
    })

    describe('Test Scenario 5: We need to Delete note from Task', () => {
        // we need click on Edit note and then click delete
        it.skip('Test Case 5: we need click on Edit note and Delete note ', () => {
            cy.get('#mainMenuTabSERVICETRACK').click()
            cy.contains('Current').click()
            // below will input task name and click submit button to create task
            cy.contains('Test1233test2233').click()
            cy.contains('1 October 2021 11:30pm Albert Vass').parents('#boxTaskNotes')
            .get('[data-noteid="118608"]').click()
            cy.contains('1 October 2021 11:30pm Albert Vass').parents('#boxTaskNotes')
            .get('[data-noteid="118608"]').get('[role="button"]').get('.editNoteDelete').click()
            
         })
    }) 

})