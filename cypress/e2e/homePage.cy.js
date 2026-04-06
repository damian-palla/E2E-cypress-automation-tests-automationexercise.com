import POMhome from "../POMpages/POMhome"

const home = new POMhome();

describe('Validating Home Page features', () => {

    beforeEach(() => {
        home.visitingHomePage()
    })   

// Logo and Tabs section
    it('Logo and Tabs are visible', () => {
        cy.title().should('eq', 'Automation Exercise')
        cy.get('img[alt="Website for automation practice"]').should('be.visible')
        home.homeTab().should('be.visible')
        home.productsTab().should('be.visible')
        home.cartTab().should('be.visible')
        home.loginTab().should('be.visible')
        home.testcasesTab().should('be.visible')
        home.APItestingTab().should('be.visible')
        home.videosTab().should('be.visible')
        home.contactTab().should('be.visible')
    })


    it('Tabs section - redirection', () => {
        home.allTabs().forEach(({ tab, url }) => {
            home.visitingHomePage()
            tab().click()
            cy.url().should('include', url)
            
        })
        // Validtaing 'href' atribute of videos tab in stead of url 
        // because it redirects to Youtube
        home.videosTab().should('have.attr', 'href').and('include', 'youtube.com')
    })


// Brands section
    it('Brands section - Visible and redirection', () => {
        cy.fixture('brands').then((brands) => {
            brands.forEach(({ name, urlBrand }) => {
                home.visitingHomePage()
                cy.contains('a', name).should('be.visible').click()
                cy.url().should('include', urlBrand)
                cy.get('.title').should('contain.text', 'Brand - ' + name)
            })
        })
    })


// Category section    
    it('Category section - Visible and subcategories', () => {

        cy.fixture('categories').then((categories) => {
            categories.forEach(({ category, subcategories }) => {
                cy.log('Sección ' +  category + ' y sus subcategorías')    /* log */
                cy.contains('a', category).as(category + ' section').should('be.visible').click()
                cy.get(`#${category}`).contains('a', subcategories[0].subcategoryName).should('be.visible')

                subcategories.forEach(({subcategoryName, urlSubcategory}) => {
                    cy.get(`#${category}`).contains('a', subcategoryName).as(category + ' - ' + subcategoryName).should('be.visible').click()
                    cy.url().should('include', urlSubcategory)
                    home.visitingHomePage()
                    cy.contains('a', category).as(category + ' section').should('be.visible').click()
                })
            })
        })

    })

// Carousel section    
    it('Carousel - Slides are visible and functional', () => {
        cy.log('Validating Right arrow of the carousel')     /* log */
        home.rightArrow().should('be.visible').click()
        cy.wait(1000)
        home.rightArrow().click()
        cy.wait(1000)

        cy.log('Validating Left arrow of the carousel')   /* log */
        home.leftArrow().should('be.visible').click()
        cy.wait(1000)
        home.leftArrow().click()
        cy.wait(1000)
        
    })

    it('Validating title and description in the carousel slides', () => {

        cy.fixture('carouselHome').then((slides) => {

            cy.log('Validating information and arrows in the slides')
            
            slides.forEach((objectSlide) => {

                // Custom command
                cy.validatingSlide(objectSlide)

                home.rightArrow().click()
                cy.wait(1000)
            })

            cy.log('Validating buttons in the slides')
            slides[0].buttons.forEach((button) => {
                cy.log('Validating button for url: ' + button.urlButton).as('Validating button for url: ' +button.urlButton)
                cy.get('.item.active').find(`a[href*="${button.urlButton}"]`).should('be.visible').and('have.attr', 'href', button.urlButton)
                home.rightArrow().click()
                cy.wait(1000)
            })
        })    
    })

// Features products section - Visible and functional
    
    it.only('Validating features products section', () => {
        
        // Custom command
        cy.feautersProductsSection()
    })
     
//  Recommended items section - Visible and functional   
    it('Validating recommended items section', () => {

        // Custom command
        cy.recommendedProductsSlides()    

        // To next slide
        cy.get('#recommended-item-carousel > .right > .fa').click().as('Siguiente slide')

        // Custom command
        cy.recommendedProductsSlides()
        
    
    })
    
    
})      