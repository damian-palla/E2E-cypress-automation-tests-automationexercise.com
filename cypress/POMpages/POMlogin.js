class POMlogin {

// Login email selector
    loginEmail() {
        return cy.get('[data-qa="login-email"]')
    }

// Login password selector
    loginPassword(){
        return cy.get('[data-qa="login-password"]')
    }

// Login button selector
    loginButton(){
        return cy.get('[data-qa="login-button"]')
    }    

// Sing up name selector
    
    signUpName() {
        return cy.get('[data-qa="signup-name"]')
    }

// Sign up email selector
    signUpEmail() {
        return cy.get('[data-qa="signup-email"]')
    }

// Sign up button selector
    signUpButton() {
        return cy.get('[data-qa="signup-button"]')
    }    


}


export default POMlogin;