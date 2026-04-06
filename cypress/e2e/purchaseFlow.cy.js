import POMhome from "../POMpages/POMhome"
const home = new POMhome();

import POMsignUp from"../POMpages/POMsignUp"
const signUp = new POMsignUp();

import POMlogin from "../POMpages/POMlogin"
const login = new POMlogin();

describe('Purchase flow', () => {
    beforeEach(() => {
        home.visitingHomePage()
})

// TC - Products are added to cart from Home (without being logged in) 
    it('Adding products to cart from Home and validating cart', () => {  

    // Step 1: Adding products to cart from Home
    // Step 2: Validating products in cart (image, name, category, price, total price per product)
        cy.addProductsAndValidateCart(home)

    // Step 3: Proceeding to checkout        
        cy.contains('Proceed To Checkout').should('be.visible').click()

    // Step 4: Validating modal- User must be logged in to proceed to checkout  
        cy.log('/// ===== 📌 VALIDATING MODAL CONTENT 📌  ===== ///')
        cy.contains('Checkout').should('be.visible')
        cy.contains('Register / Login account to proceed on checkout.').should('be.visible')
        cy.get('a[href="/login"]').should('have.attr','href', '/login').should('be.visible')

    // Step 4: Clicking on 'Register / Login" redirects to Login/Sigup page        
        cy.get('div#checkoutModal').find('a[href="/login"]')
            .should('have.attr','href', '/login')
            .should('be.visible')
            .click()
        cy.url().should('include', '/login')

    })


// TC - Adding products to cart from home --> Log in --> Checkout
    it.only('Adding products to cart from home --> Log in --> Checkout', () => {

    // Step 1: Adding products to cart from Home
    // Step 2: Validating products in cart (image, name, category, price, total price per product)
        cy.addProductsAndValidateCart(home)

    // Step 3: Proceeding to checkout        
        cy.contains('Proceed To Checkout').should('be.visible').click() 
        
    // Step 4: Clicking on 'Register / Login" redirects to Login/Sigup page        
        cy.get('div#checkoutModal').find('a[href="/login"]')
            .should('have.attr','href', '/login')
            .should('be.visible')
            .click()
        cy.url().should('include', '/login')    

    // Step 5: Log in    
        cy.fixture('usersData').then((userData) => {
            login.loginEmail().type(`${userData[1].email}`)
            login.loginPassword().type(`${userData[1].password}`)
            login.loginButton().click()

    //Step 6: Cart again and checkout        
            home.cartTab().click()
            cy.contains('Proceed To Checkout').should('be.visible').click()

            cy.fixture('productsForTest').then((products) => {
            products.forEach((product) => {
                cy.productsInCart(product)
            })

    // Step 7: Validating cart again and total
            cy.contains('Review Your Order').should('be.visible')        
            cy.validateTotalAmount(products)
    
            }) 
    
                

        })
    })

})    