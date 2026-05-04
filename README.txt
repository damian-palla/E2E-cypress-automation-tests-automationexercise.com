# 🧪 Cypress Automation Tests — automationexercise.com (Spanish and English versions)

## (ENG) English Version <a name="english-version"></a>

### Description

End-to-end (E2E) automated test suite built with **Cypress + Javascript** for https://www.automationexercise.com, an e-commerce platform used to practice test automation.

The project implements the **Page Object Model (POM)** pattern, custom Cypress commands, and fixtures to structure tests in a scalable, reusable, and maintainable way.

---

### ✅ Test cases covered

**Home Page (`homePage.cy.js`)**
- Logo and navigation tabs visibility and redirection
- Brands section validation and redirections
- Categories and subcategories validation
- Carousel: navigation arrows and slide content (title, subtitle, description, images)
- Featured Products section: name, price, image, link
- Recommended Items section: visibility and prices

**Login & Registration (`login.cy.js`)**
- New account creation with valid data from fixture
- Post-registration confirmation message validation
- Logout and redirection to login page
- Test account deletion

**Purchase flow (`purchaseFlow.cy.js`)**
- Adding products to cart from home page
- Cart validation: image, name, category, unit price and total per product
- Checkout modal verification for non-logged-in users
- Full flow: add products → checkout → login → validate cart → validate total

---

### 🏗️ Design pattern: Page Object Model (POM)

The project uses the **POM** pattern to separate selector/action logic from test logic. Each page of the application has its own class inside the `POMpages/` folder:

| POM File | Page represented |
|---|---|
| `POMhome.js` | Home Page — tabs, carousel, products, categories |
| `POMlogin.js` | Login page and Sign Up form |
| `POMsignUp.js` | New account registration form |

Each class encapsulates the selectors and methods of that page, and tests instantiate them with `new`:

---

### ⚙️ Custom commands (`commands.js`)

Reusable commands are defined in `cypress/support/commands.js`:

| Command | Description |
|---|---|
| `cy.validatingSlide(objectSlide)` | Validates title, subtitle, description and image of a carousel slide |
| `cy.feautersProductsSection()` | Validates all 34 products in the Featured Products section |
| `cy.recommendedProductsSlides()` | Validates visible products in the Recommended Items carousel |
| `cy.newAccount(userData, signUp)` | Fills out the registration form with fixture data |
| `cy.deleteAccount(userData, login, home)` | Logs in and deletes a user account |
| `cy.addProductsFromHome(product)` | Hovers and adds a product to cart from home |
| `cy.productsInCart(product)` | Validates name, image, category, price and total of a product in cart |
| `cy.addProductsAndValidateCart(home)` | Combines `addProductsFromHome` and `productsInCart` for the full flow |
| `cy.login(usersData)` | Logs in a user using `cy.session()` to reuse the session |
| `cy.validateTotalAmount(products)` | Validates the total cart amount at checkout |

---

### 📁 Project structure

```
cypress-automation-tests-automationexercise.com/
│
├── cypress/
│   ├── e2e/                        # Test files
│   │   ├── homePage.cy.js          # Home page tests
│   │   ├── login.cy.js             # Registration and login tests
│   │   └── purchaseFlow.cy.js      # Purchase flow tests
│   │
│   ├── POMpages/                   # Page Object Model
│   │   ├── POMhome.js              # Home selectors and methods
│   │   ├── POMlogin.js             # Login selectors and methods
│   │   └── POMsignUp.js            # Sign Up selectors and methods
│   │
│   ├── fixtures/                   # Test data (JSON)
│   │   ├── usersData.json          # User data for registration/login
│   │   ├── productsForTest.json    # Products used in purchase flow
│   │   ├── brands.json             # Brands and their URLs
│   │   ├── categories.json         # Categories and subcategories
│   │   └── carouselHome.json       # Carousel slide content
│   │
│   └── support/
│       ├── commands.js             # Custom Cypress commands
│       └── e2e.js                  # Global support configuration
│
├── cypress.config.js               # Cypress configuration
├── package.json
└── .gitignore
```

---

### 🛠️ Tech stack

- [Cypress](https://www.cypress.io/) — E2E testing framework
- JavaScript (ES6+)
- Node.js
- Page Object Model (POM) design pattern

---

### 🚀 How to run the tests

1. Clone the repository:
```bash
git clone https://github.com/damian-palla/cypress-automation-tests-automationexercise.com.git
cd cypress-automation-tests-automationexercise.com
```

2. Install dependencies:
```bash
npm install
```

3. Open Cypress in interactive mode:
```bash
npx cypress open
```

4. Or run in headless mode:
```bash
npx cypress run
```

### 📌 Prerequisites

- Node.js (recommended version: 18+)
- npm


## (ESP) Versión en Español

### Descripción

Suite de pruebas automatizadas end-to-end (E2E) desarrollada con **Cypress + Javascript** para el sitio https://www.automationexercise.com, una plataforma de e-commerce utilizada para practicar automatización de pruebas.

El proyecto implementa el patrón **Page Object Model (POM)**, comandos personalizados de Cypress y fixtures para estructurar los tests de manera escalable, reutilizable y fácil de mantener.

---

### ✅ Casos de prueba cubiertos

**Home Page (`homePage.cy.js`)**
- Verificación de logo y tabs de navegación (visibilidad y redirección)
- Validación de la sección de marcas (Brands) y sus redirecciones
- Validación de categorías y subcategorías
- Carousel: flechas de navegación y contenido de slides (título, subtítulo, descripción, imágenes)
- Sección de productos destacados (Features Products): nombre, precio, imagen, enlace
- Sección de productos recomendados (Recommended Items): visibilidad y precios

**Login & Registro (`login.cy.js`)**
- Creación de cuentas nuevas con datos válidos desde fixture
- Validación de mensaje de confirmación post-registro
- Logout y redirección a página de login
- Eliminación de cuentas de prueba

**Flujo de compra (`purchaseFlow.cy.js`)**
- Agregar productos al carrito desde la home
- Validación del carrito: imagen, nombre, categoría, precio unitario y total por producto
- Verificación del modal de checkout para usuarios no logueados
- Flujo completo: agregar productos → checkout → login → validar carrito → validar total

---

### 🏗️ Patrón de diseño: Page Object Model (POM)

El proyecto utiliza el patrón **POM** para separar la lógica de los selectores y acciones de la lógica de los tests. Cada página de la aplicación tiene su propia clase en la carpeta `POMpages/`:

| Archivo POM | Página que representa |
|---|---|
| `POMhome.js` | Home Page — tabs, carousel, productos, categorías |
| `POMlogin.js` | Página de Login y formulario de Sign Up |
| `POMsignUp.js` | Formulario de registro de nueva cuenta |

Cada clase encapsula los selectores y métodos de esa página, y los tests los instancian con `new`:


---

### ⚙️ Comandos personalizados (`commands.js`)

Los comandos reutilizables están definidos en `cypress/support/commands.js` junto con la descripción de su utilidad:

| Comando | Descripción |
|---|---|
| `cy.validatingSlide(objectSlide)` | Valida título, subtítulo, descripción e imagen de un slide del carousel |
| `cy.feautersProductsSection()` | Valida los 34 productos de la sección Featured Products |
| `cy.recommendedProductsSlides()` | Valida los productos visibles en el carousel de recomendados |
| `cy.newAccount(userData, signUp)` | Completa el formulario de registro con datos del fixture |
| `cy.deleteAccount(userData, login, home)` | Loguea y elimina una cuenta de usuario |
| `cy.addProductsFromHome(product)` | Hace hover y agrega un producto al carrito desde la home |
| `cy.productsInCart(product)` | Valida nombre, imagen, categoría, precio y total de un producto en el carrito |
| `cy.addProductsAndValidateCart(home)` | Combina `addProductsFromHome` y `productsInCart` para el flujo completo |
| `cy.login(usersData)` | Loguea un usuario usando `cy.session()` para reutilizar la sesión |
| `cy.validateTotalAmount(products)` | Valida el monto total del carrito en el checkout |

---

### 📁 Estructura del proyecto

```
cypress-automation-tests-automationexercise.com/
│
├── cypress/
│   ├── e2e/                        # Archivos de test
│   │   ├── homePage.cy.js          # Tests de la página principal
│   │   ├── login.cy.js             # Tests de registro y login
│   │   └── purchaseFlow.cy.js      # Tests del flujo de compra
│   │
│   ├── POMpages/                   # Page Object Model
│   │   ├── POMhome.js              # Selectores y métodos de Home
│   │   ├── POMlogin.js             # Selectores y métodos de Login
│   │   └── POMsignUp.js            # Selectores y métodos de Sign Up
│   │
│   ├── fixtures/                   # Datos de prueba (JSON)
│   │   ├── usersData.json          # Datos de usuarios para registro/login
│   │   ├── productsForTest.json    # Productos usados en el flujo de compra
│   │   ├── brands.json             # Marcas y sus URLs
│   │   ├── categories.json         # Categorías y subcategorías
│   │   └── carouselHome.json       # Contenido de slides del carousel
│   │
│   └── support/
│       ├── commands.js             # Comandos personalizados de Cypress
│       └── e2e.js                  # Configuración global de soporte
│
├── cypress.config.js               # Configuración de Cypress
├── package.json
└── .gitignore
```

---

### 🛠️ Tecnologías utilizadas

- [Cypress](https://www.cypress.io/) — Framework de testing E2E
- JavaScript (ES6+)
- Node.js
- Patrón Page Object Model (POM)

---

### 🚀 Cómo ejecutar los tests

1. Clonar el repositorio:
```bash
git clone https://github.com/damian-palla/cypress-automation-tests-automationexercise.com.git
cd cypress-automation-tests-automationexercise.com
```

2. Instalar dependencias:
```bash
npm install
```

3. Abrir Cypress en modo interactivo:
```bash
npx cypress open
```

4. O ejecutar en modo headless:
```bash
npx cypress run
```

### 📌 Requisitos previos

- Node.js (versión recomendada: 18+)
- npm

---
---







---

*Proyecto de práctica de automatización de pruebas / Test automation practice project*
