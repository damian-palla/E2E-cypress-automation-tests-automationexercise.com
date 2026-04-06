class POMhome {

// Basic URL
    visitingHomePage() {
        cy.visit('https://automationexercise.com/')
    }


                        ///   Tabs   ///

// Products tab
    productsTab(){
    return cy.contains('a', 'Products')
    }


// Home tab
    homeTab(){
    return cy.contains('a', 'Home')
    }


// Cart tab
    cartTab(){
    return  cy.contains('a', 'Cart')
    }


// Login tab
    loginTab(){
    return cy.contains('a', 'Signup / Login')
    }


// Test cases tab
    testcasesTab(){
    return  cy.contains('a', 'Test Cases')
        }


// API Testing tab
    APItestingTab(){
    return cy.contains('a', 'API Testing')
    }


// Videos tab
    videosTab(){
    return cy.contains('a', 'Video Tutorials')
    }


// Contact us tab}
    contactTab(){
    return cy.contains('a', 'Contact us')
    }


// Get all tabs
    allTabs(){
        return [
            { tab: () => this.homeTab(), url: '/' },
            { tab: () => this.productsTab(), url: '/products' },
            { tab: () => this.cartTab(), url: '/view_cart' },
            { tab: () => this.loginTab(), url: '/login' },
            { tab: () => this.testcasesTab(), url: '/test_cases' },
            { tab: () => this.APItestingTab(), url: '/api_list' },
            { tab: () => this.contactTab(), url: '/contact_us' }
        ]
    }

// Carousel - Left arrow
    leftArrow(){
        return cy.get('#slider-carousel > .left > .fa')
    }

// Carousel - Right arrow
    rightArrow() {
        return cy.get('#slider-carousel > .right > .fa')
    }

// Carousel - Slides buttons
    slideButton(buttonText) {
        return cy.contains('a', buttonText)
    }    
    
}

export default POMhome;