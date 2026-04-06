import POMhome from "../POMpages/POMhome"
const home = new POMhome();

import POMsignUp from"../POMpages/POMsignUp"
const signUp = new POMsignUp();

import POMlogin from "../POMpages/POMlogin"
const login = new POMlogin();

describe('Validating Home Page features', () => {

    beforeEach(() => {
        home.visitingHomePage()
    })   

// Creating a new account with valid data and deleting the account to clear the data    
    it('Creating a new account with valid data (and deleting the account to clear the data)', () => {

        cy.fixture('usersData').then((userData) => {
            
            userData.forEach((userData, index) => {
            cy.log(`New user #${index+1}`).as(`New user #${index+1}`)
            home.loginTab().click()
            login.signUpName().type(userData.name).as('User Name')
            login.signUpEmail().type(userData.email).as('User Email')
            login.signUpButton().click()
            
            // Data for new account from fixture 'usersData'
            cy.newAccount(userData, signUp)

            signUp.createAccountButton().click().as('Creating new account')

            // Confirmation message and redirection to home page
            cy.contains('h2', 'Account Created!').should('be.visible').as('Confirmation message')
            cy.contains('a', 'Continue').should('be.visible').click()

            // Deleting the account created
            cy.get('a[href="/delete_account"]').should('be.visible').click().as('Deleting the account')
            cy.contains('h2', 'Account Deleted!').should('be.visible').as('Account deleted confirmation')
            cy.get('[data-qa="continue-button"]').should('be.visible').click()

            })
        })
    })


// Creating accounts without deleting them, to be able to test the deletion of accounts in a separate test case    
    it.only('Creating accounts (no delete)', () => {

        cy.fixture('usersData').then((userData) => {
            
            userData.forEach((userData, index) => {
                cy.log(`New user #${index+1}`).as(`New user #${index+1}`)
                home.loginTab().click()
                login.signUpName().type(userData.name).as('User Name')
                login.signUpEmail().type(userData.email).as('User Email')
                login.signUpButton().click()
            
            // Data for new account from fixture 'usersData'
                cy.newAccount(userData, signUp)

                signUp.createAccountButton().click().as('Creating new account')

                // Confirmation message and redirection to home page
                cy.contains('h2', 'Account Created!').should('be.visible').as('Confirmation message')
                cy.contains('a', 'Continue').should('be.visible').click()
                cy.contains('a', 'Logout').should('be.visible').click()
                cy.url().should('include', '/login').as('Redirection to login page')

                // Deleting the account created
                // cy.get('a[href="/delete_account"]').should('be.visible').click().as('Deleting the account')
                // cy.contains('h2', 'Account Deleted!').should('be.visible').as('Account deleted confirmation')
                // cy.get('[data-qa="continue-button"]').should('be.visible').click()

            })
        })
    })


// Deleting all accounts created from fixture "usersData"    
    it('Deleting accounts', () => {
        cy.fixture('usersData').then((userData) => {
            userData.forEach(userData => {
                cy.deleteAccount(userData, login, home)
            })
        })
    })




})   