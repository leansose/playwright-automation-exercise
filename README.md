# Playwright Automation Exercise

## Overview

This project demonstrates a complete end-to-end UI automation framework built with **Playwright** and **TypeScript** using the **Page Object Model (POM)** design pattern.

The project was developed as part of my QA Automation learning journey, focusing not only on writing automated tests but also on building a scalable and maintainable automation framework following industry best practices.

**Application Under Test**

https://automationexercise.com/

---

## Statistics

- ✅ 24 Automated Test Scenarios
- 📄 7 Page Objects
- 🔄 Reusable Fixtures
- 🎲 Dynamic Test Data with Faker

## Technologies

- Playwright
- TypeScript
- Faker
- Git & GitHub
- Jira
- Visual Studio Code

---

## Framework Features

- Page Object Model (POM)
- Modular Page Objects
- Dynamic Test Data Generation using Faker
- Externalized Test Data
- Reusable Fixtures
- Helper Functions
- Reusable Locators
- End-to-End UI Automation
- TypeScript

---

## Automated Features

### Authentication

- User Registration
- User Login
- User Logout
- Account Deletion

### Products

- View Products
- Product Details
- Search Products
- Product Reviews
- Add Products to Cart
- Add Multiple Products to Cart

### Cart

- Verify Products in Cart
- Remove Products
- Validate Product Quantity

### Checkout

- Proceed to Checkout
- Validate Delivery Address
- Validate Billing Address
- Validate Total Order Amount
- Add Order Comments

### Payment

- Complete Payment
- Verify Successful Order
- Download Invoice

---

## Current Project Structure

```text
playwright-automation-exercise/

├── pages/
├── tests/
├── fixtures/
├── helpers/
├── test-data/
├── playwright.config.ts
└── README.md
```

---

## Test Environment

| Item | Value |
|------|-------|
| Browser | Chromium |
| Future Support | Firefox / WebKit |
| Operating System | Windows |
| IDE | Visual Studio Code |
| Test Management | Jira |
| Version Control | Git / GitHub |

---

## Framework Goals

The main objective of this project is to practice building a maintainable and scalable UI automation framework while applying QA Automation best practices.

Current focus includes:

- Maintainable Page Objects
- Reusable code
- Clean project structure
- Separation of test data
- Readable and scalable tests
- End-to-End testing

---

## Current Improvements

Implemented:

- Page Object Model
- Dynamic Test Data with Faker
- Externalized Test Data
- Fixtures
- Modular framework structure
- Checkout validation
- Payment workflow
- Invoice download
- Address verification
- Total amount calculation

---

## Future Improvements

Planned improvements include:

- BasePage implementation
- Reusable UI Components
- HTML Reports
- GitHub Actions (CI)
- Cross-browser execution
- Parallel execution optimization
- Framework refactoring
- Improved fixture organization

---

## Notes

This project uses **https://automationexercise.com** as the application under test.

During development a few environment-related limitations were identified:

- Dynamic advertisements may occasionally interfere with UI interactions.
- Cookie banners may appear depending on the browser session.
- Response times are sometimes inconsistent, which may occasionally produce intermittent (flaky) test failures.
- Some negative validation scenarios cannot be automated because the application does not implement client-side validation.
- Tests validate stable application states instead.

---

## Continuous Integration

🚧 Planned

Future versions of this project will include GitHub Actions to automatically:

- Install dependencies
- Execute the Playwright test suite
- Generate execution reports
- Validate every push

---

## Reports

🚧 Planned

Future improvements include automatic generation of Playwright HTML Reports containing:

- Test execution summary
- Passed and failed tests
- Screenshots on failure
- Trace Viewer support

---

## Learning Objectives

This repository documents my transition into QA Automation while practicing:

- UI Test Automation
- Playwright
- TypeScript
- Test Design
- Framework Architecture
- Automation Best Practices
- Git Workflow
- Continuous Integration
