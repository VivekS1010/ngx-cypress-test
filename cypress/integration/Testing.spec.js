/// <reference types="cypress" />

const baseURL = 'https://office.aroflo.com/';

describe('Our first suite', () => {

    beforeEach(() => {
        cy.visit('https://office.aroflo.com/')
        
        
        //cy.get('#imsMainContent')
        //    .should('exist')
    })

    it('Should go to Create Task and make some gets', () => {
        cy.visit(baseURL + 'ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK')

        //By Tag name
        cy.get('input')

        //By ID
        cy.get('#wrname')

        //By Class name
        cy.get('.afTextfield__input')

        //By Attribute name
        cy.get('[name]')

        //By Attribute name & value
        cy.get('[name="wrname"]')

        //By Class value
        cy.get('[class="afTextfield__input vd_required vd_length"]')

        //By Tag name & Attribute with value
        cy.get('input[name="wrname"]')

        //By two different attributes
        cy.get('input[name="wrname"][maxlength="50"]')

        //By Tag name, attribute with value, ID and class name
        cy.get('input[name="wrname"]#wrname.afTextfield__input')

        /*QA created attributes & values
          This doesn't exist fully yet.
          cy.get('[data-qa-id="something"]')
        */
    })

    it.skip('Should create a task', () => {
        cy.visit(baseURL + 'ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK')
        cy.get('input[name="wrname"]').type('Task Creation Automation')
        cy.get('#addrequest__submit').click()
        cy.get('#pageViewTask')
            .should('exist')
        cy.get('.afDataTable__cell--non-numeric')
            .contains('Task Creation Automation')
            .should('exist')
    })

    it('Should select a task asset', () => {
        cy.visit(baseURL + 'ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK')
        cy.get('#btnAdvSearch[walkme-task-assetsearch=""]').click()
        cy.get('li[foldername="AroPoint GPS"]')
            .should('be.visible')
        cy.get('td[title="AroPoint GPS"]').dblclick()
        cy.get('input#assetName')
            .invoke('prop', 'value')
            .should('contain', 'DylanR Sandbox')
    })
    
    it('Should locate using the .parents() method', () => {
        cy.visit(baseURL + 'ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK')

        //Assuming the "Create Task" button had no uniqueness we could locate it as follows
        
        cy.get('#wrname')                       //Find the Task Identification field
            .parents('form')                    //Traverse back up the DOM to the parent of wrname + the element we really want
            .find('button#addrequest__submit')  //Not the best example but if this was the only instance of a button on the page we could remove the ID

        cy.get('#newwr')                        //Lets assume there are two forms on the page and both contain an element with ID wrname but the form ID's                                            //
            .find('#wrname')                    //are unique, what we can do is get the form id THEN search for an ID within that form.
    })

    it('.then() and wrap() methods', () => {
        cy.visit(baseURL + 'ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK')
        /*
        Using the same example as the previous test where an imaginary second form exists with the same elements
        you would expect the following "selenium" style code to work. However it does not due to the asynchronous nature of Cypress.
        const createTaskForm = cy.get('#newwr')
        createTaskForm.find('[for="wrname"]').should('contain', 'Task Identification:')     -- Will Pass
        createTaskForm.find('[for="assetName"]').should('contain', 'Asset:')                -- Will Fail

        To do this the Cypress way we would do the following using the then() function. This will take a bit of getting used to (coming from Python)
        */
       cy.get('#newwr').then(createTaskForm => {   //Everything within this then() function will now use jQuery 
            const taskIDLabel = createTaskForm.find('[for="wrname"]').text()
            const assetLabel = createTaskForm.find('[for="assetName"]').text()
            expect(taskIDLabel).to.contain('Task Identification:')
            expect(assetLabel).to.contain('Asset:')

            //If we wanted to switch back to Cypress style assertions we would use cy.wrap() and chain off that instead
            cy.wrap(createTaskForm).find('[for="wrname"]').should('contain', 'Task Identification:')
            cy.wrap(createTaskForm).find('[for="assetName"]').should('contain', 'Asset:')
       })         
    })

    it('invoke command', () => {
        cy.visit(baseURL + 'ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK')

        cy.get('input#quote')
            .check({force: true})               //Element isn't visible in the DOM so we need to force a check
            .should('be.checked')               //A nice assertion for checking if an element is checked. Can also use not.be.checked
        cy.get('#addrequest__submit')
            .invoke('attr', 'value')
            .should('contain', 'Create Quote')
    })

    it('lists and dropdowns', () => {
        cy.visit(baseURL + 'ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK')

        cy.get('#priority_id').select('HIGH')
            .should('contain', 'HIGH')
            .invoke('prop', 'value')
            .should('equal', '582')
    })

    it('Web tables', () => {
        cy.visit(baseURL + 'ims/Site/Service/managetasks/index.cfm?view=1&tid=IMS.STK.CUR')

        cy.get('#tblCurTasks').contains('tr', 'Task Creation Automation').then(tableRow => {        //Switch our context to the row we are testing 
            //The following CSS classes are not unique across the whole page BUT because we are in the context of a single row they are now unique
            cy.wrap(tableRow).find('.page-content-task-jobnumber').should('contain', '1067')
            cy.wrap(tableRow).find('.page-content-task-required').should('contain', '9/9/2021')
            cy.wrap(tableRow).find('.page-content-task-tasktype').should('contain', 'After hours service')
            cy.wrap(tableRow).find('.page-content-task-name').should('contain', 'Task Creation Automation')
            cy.wrap(tableRow).find('.page-content-task-client').should('contain', 'DylanR Sandbox')
            cy.wrap(tableRow).find('.page-content-task-assigned').should('contain', 'DylanR Sandbox')
            cy.wrap(tableRow).find('.page-content-task-updated').should('contain', '8/9/2021')
            cy.wrap(tableRow).find('.page-content-task-status').should('contain', 'Not Started')
        })

        //We can rewrite the above code as follows which would reduce code duplication and make use of a for each loop
        const taskData = ['1067', '9/9/2021', 'After hours service', 'Task Creation Automation', '8/9/2021', 'DylanR Sandbox', 'Not Started']

        cy.wrap(taskData).each(taskData => {
            cy.get('#tblCurTasks').contains('tr', 'Task Creation Automation').then(tableRow => {
                cy.wrap(tableRow).find('td').should('contain', taskData)
            })
        })

    //     cy.get('table')
    //             .invoke('attr', 'data-walkme-section')
    //             .should('equal', 'taskHeader')
    })

    it.skip('Datepicker', () => {
        cy.visit(baseURL + 'ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK')

        let date = new Date()
        date.setDate(date.getDate() + 7)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', {month: 'long'})
        let dateAssert = date.toLocaleDateString('en-AU').replace(/(^|\/)0+/g, "$1")        //AroFlo doesn't include zeroes in the day and month so strip them

        cy.get('#datePopout').click()
        cy.get('.rd-month-label').invoke('text').then(dateAttribute => {
            if(!dateAttribute.includes(futureMonth)){
                cy.get('.rd-next').click()
                cy.get('.rd-day-body').contains(futureDay).click()
            } else {
                cy.get('.rd-day-body').contains(futureDay).click()
            }
        })
        cy.get('#RequiredBy').invoke('attr', 'value').should('contain', dateAssert)
    })
})