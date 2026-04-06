///   COMMANDS   ///     


                //**//       VALIDATING SLIDES IN CAROUSEL COMMAND              //**//
Cypress.Commands.add('validatingSlide', ({slide, title, subtitle, description, image}) => {
    cy.log('Validating slide #' + slide)
    cy.get(`img[src="${image}"]`).should('be.visible').closest('.item.active').as('activeSlide')
    cy.get('@activeSlide').contains(title).should('be.visible')
    cy.get('@activeSlide').contains(subtitle).should('be.visible')
    cy.get('@activeSlide').contains(description).should('be.visible')
})

                //**//       VALIDATING FEATURES PRODUCTS SECTION COMMAND              //**//
Cypress.Commands.add('feautersProductsSection', () =>{

    cy.get('.features_items .product-image-wrapper').should('have.length', 34).each(($product, index) => {
                
                const productName = $product.find('.productinfo p').text().trim()
                const productID = $product.find('a[data-product-id]').attr('data-product-id')

                cy.log('Validating product: ' + productName).as(productName).as('Product: ' + productName)
                cy.wrap($product).should('be.visible')
                cy.wrap($product).find('h2').should('not.be.empty').and('be.visible').as('Price')
                cy.wrap($product).find('img').should('have.attr', 'src', `/get_product_picture/${productID}`).as('Image')
                cy.wrap($product).find('a[href]').should('have.attr', 'href', `/product_details/${productID}`).as('View Product')
            })
})


                //**//       VALIDATING RECOMMENDED PRODUCTS SLIDES COMMAND              //**//
Cypress.Commands.add('recommendedProductsSlides', () => {

    cy.get('.recommended_items .item.active .product-image-wrapper:visible').should('have.length', 3).each(($product,index) => {

            const productName = $product.find('.productinfo p').text().trim()
            const productPrice = $product.find('h2',).text().trim()
            const priceFormat = /^Rs\.\s\d+/


            cy.wrap($product).should('be.visible').as(`Product container ${index+1}`)
            cy.wrap($product).find('p').as(`Product name: ${productName}`).should('not.be.empty').and('be.visible')
            cy.wrap($product).find('h2').as(`Price: ${productPrice}`).should('not.be.empty').and('be.visible').invoke('text').should('match', priceFormat)            
            cy.wrap($product).find('.add-to-cart').as('Cart Button').should(('be.visible'))
    })
})


           //**//       CREATING A NEW ACCOUNT COMMAND              //**//

Cypress.Commands.add('newAccount',(usersData, POMsignUp) =>{

//Name, email and password are mandatory fields
    //POMsignUp.nameInput().type(usersData.name)
    //POMsignUp.emailInput().type(usersData.email)
    POMsignUp.passwordInput().type(usersData.password).as('Password')

// Date of birth is a mandatory field   
//Creating an array with the months to select them by their position
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December']  

// Splitting day, month and year of birth to select them in the list  
const [day, month, year] = usersData.birth.split('/')

// Using the month number to select it in the list by position and converting it to an integer
const monthIndex = months[parseInt(month) - 1]

// Converting the day of birth to an integer
const dayIndex = parseInt(day)

    POMsignUp.birthDay().select(dayIndex).as('Day of Birth')
    POMsignUp.birthMonth().select(monthIndex).as('Month of Birth')
    POMsignUp.birthYear().select(year).as('Year of Birth')


// First and last name are mandatory fields 
    POMsignUp.addressFirstName().type(usersData.addressName).as('Address - First Name')
    POMsignUp.addressLastName().type(usersData.addressLastName).as('Address - Last Name')
    
//Company it's not a mandatory field, so we validate if it exists in the fixture before typing it
    if(usersData.company){
        POMsignUp.company().type(usersData.company).as('Address - Company')
    }

//Address 1 it's a mandatory field
    POMsignUp.address1().type(usersData.address1).as('Address - Address1')


// Address 2 it's not a mandatory field, so we validate if it exists in the fixture before typing it
    if (usersData.address2) {
    POMsignUp.address2().type(usersData.address2).as('Address - Address2')
    }

// Country it's a mandatory field
    POMsignUp.country().select(usersData.country).as('Address - Country')    

// State it's a mandatory field
    POMsignUp.state().type(usersData.state).as('Address - State')

// City it's a mandatory field
    POMsignUp.city().type(usersData.city).as('Address - City')

// Zipcode it's a mandatory field
    POMsignUp.zipcode().type(usersData.zipcode).as('Address - Zipcode')

// Mobile number it's a mandatory field
    POMsignUp.mobileNumber().type(usersData.mobilePhone).as('Address - Mobile Number')

})


                 //**//       DELETING ACCOUNTS COMMAND              //**//

Cypress.Commands.add('deleteAccount', (userData, login, home) => {
    
 // Login
    home.loginTab().click()
    login.loginEmail().type(userData.email)
    login.loginPassword().type(userData.password)
    login.loginButton().click()
    
// Deleting the account
    cy.get('a[href="/delete_account"]').should('be.visible').click().as('Deleting the account')
    cy.contains('h2', 'Account Deleted!').should('be.visible').as('Account deleted confirmation')
    cy.get('[data-qa="continue-button"]').should('be.visible').click()

})


                //**//       ADDING PRODUCTS TO CART FROM HOME COMMAND              //**//

Cypress.Commands.add('addProductsFromHome', (product) => {
    cy.log(`Container for hovering product ${product.name}`).as(`ID: ${product.id} - ${product.name}`)

// Hover: using .first() to select the first element with the attribute "data-product-id${product.id}" in each iteration 
// because it's repeated inside the <div> for product information and also inside the <div> when hovering the product
    cy.get(`a[data-product-id="${product.id}"]`).first()
        .closest('.product-image-wrapper').should('be.visible').as(`Container`)
        .trigger('mouseover').as('Hovering the product')
    
    cy.get(`a[data-product-id="${product.id}"]`).first().click().as('Adding product to cart')
    cy.contains('h4', 'Added!').should('be.visible').as('Product added confirmation')
    cy.contains('button', 'Continue Shopping').should('be.visible').click().as('Continue shopping')

})


                //**//       VALIDATING PRODUCTS IN CART               //**//

Cypress.Commands.add('productsInCart', (product) => {
    cy.get(`tr#product-${product.id}`).within(() => {
        cy.log(`Valitading product ID #${product.id} - ${product.name}`).as(`Product ID #${product.id} - ${product.name} in cart`)

// Validating item image and ID                
        cy.get('td.cart_product').find('img')
            .should('have.attr', 'src', `get_product_picture/${product.id}`)
            .and('be.visible')
            .as('ImageInCart')

// Validating item category and usertype
        cy.get('td.cart_description').find('h4 a')
            .should('contain.text', product.name)
            .and('be.visible')
            .as('ProductNameInCart')

        cy.get('td.cart_description').find('p')
            .should('contain.text', `${product.category.usertype.usertype} > ${product.category.category}`)
            .and('be.visible')
            .as('ProductCategoryInCart')

// Validating item price
                
        cy.get('td.cart_price').find('p')
            .should('contain.text', `${product.price}`)

            
// Validating total price for each product in cart (unitPrice * quantity)

        cy.get('td.cart_quantity').find('button').invoke('text').then((quantity) => {
            quantity = parseInt(quantity)
            const unitPrice = parseInt(product.price.replace('Rs. ', ''))
            const totalPricePerProduct = unitPrice * quantity

            cy.get('td.cart_total').find('p').should('contain.text', `Rs. ${totalPricePerProduct}`).and('be.visible').as(`Total price: Rs. ${totalPricePerProduct}`)
            })
        })
})

//**//       ADDING ANDVALIDATING PRODUCTS IN CART COMMAND              //**//
// Using commands cy.addProductsFromHome() and cy.productsInCart(product)() 
// to create a new command

Cypress.Commands.add('addProductsAndValidateCart', (home) => {
  cy.fixture('productsForTest').then((products) => {
    products.forEach((product) => {
      cy.addProductsFromHome(product)
    })

    home.cartTab().click()

    products.forEach((product) => {
      cy.productsInCart(product)
    })
  })
})


//**//       LOGGING IN COMMAND             //**//

Cypress.Commands.add('login', (usersData) => {

    const email = usersData[1].email
    const password = usersData[1].password
    const name = usersData[1].name

    cy.session(name , () => {
        cy.visit('https://automationexercise.com/login')
        cy.url().should('include', '/login')
        cy.get('[data-qa="login-email"]').type(email)
        cy.get('[data-qa="login-password"]').type(password)
        cy.get('[data-qa="login-button"]').click()

    })
    
    cy.visit('/')
    cy.contains(`Logged in as ${name}`).should('be.visible')
        

})


//**//       VALIDATING PURCHASE TOTAL IN CHECKOUT             //**//
Cypress.Commands.add('validateTotalAmount', (products) => {
  let totalAmount = 0

  products.forEach((product) => {
    cy.get(`tr#product-${product.id}`)
      .find('td.cart_quantity')
      .find('button')
      .invoke('text')
      .then((quantity) => {
        const unitPrice = parseInt(product.price.replace('Rs. ', ''))
        const total = unitPrice * parseInt(quantity)
        totalAmount += total
      })
  })

  cy.then(() => {
    cy.get('p.cart_total_price')
      .last()
      .should('contain.text', `Rs. ${totalAmount}`)
  })
})