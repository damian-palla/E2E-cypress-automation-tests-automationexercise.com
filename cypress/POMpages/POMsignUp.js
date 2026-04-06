class POMsignUp{

// Mr. Selector
    mrSelector(){
        return cy.get('input[value="Mr"]')
    }

// Mrs. Selector
    mrsSelector(){
        return cy.get('input[value="Mrs"]')
    }    


// Name selector
    nameInput(){
        return cy.get('[data-qa="name"]')
    }

// Email selector
    emailInput(){
        return cy.get('[data-qa="email"]')
    }

// Password selector
    passwordInput(){
        return cy.get('[data-qa="password"]')
    }

// Day of birth selector
    birthDay(){ 
        return cy.get('[data-qa="days"]')
    }

// BMonth of birth selector
    birthMonth(){ 
        return cy.get('[data-qa="months"]')
    }

// Year of birth selector
    birthYear(){ 
        return cy.get('[data-qa="years"]')
    }    

// Address first name  
    addressFirstName(){
        return cy.get('[data-qa="first_name"]')
    }

// Address last name
    addressLastName(){
        return cy.get('[data-qa="last_name"]')
    }

// Address Company

    company(){
        return cy.get('[data-qa="company"]')
    }

// Address 1 
    address1(){
        return cy.get('[data-qa="address"]')
    }

// Address 2
    address2(){
    return cy.get('[data-qa="address2"]')
    }

// Address country
    country(){
        return cy.get('[data-qa="country"]')
    }

// Address state
    state(){
        return cy.get('[data-qa="state"]')
    }    

// Address city
    city(){
        return cy.get('[data-qa="city"]')
    }

// Address zipcode
    zipcode(){
        return cy.get('[data-qa="zipcode"]')
    }

// Address mobile number
    mobileNumber(){
        return cy.get('[data-qa="mobile_number"]')
    }

// Create account button
    createAccountButton(){
        return cy.get('[data-qa="create-account"]')
    }    

}


export default POMsignUp;