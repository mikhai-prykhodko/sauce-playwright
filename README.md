# SauceDemo E2E Test Automation

A comprehensive end-to-end test automation framework for [SauceDemo](https://www.saucedemo.com/) using Playwright and TypeScript. This project demonstrates modern test automation practices with a clean Page Object Model (POM) architecture.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Why Playwright?](#why-playwright)
- [Test Architecture](#test-architecture)
- [Configuration](#configuration)
- [CI/CD](#cicd)

## Overview

This project provides automated testing for the SauceDemo e-commerce demo application, covering the following scenarios:
- User authentication (login/logout)
- Product browsing and selection
- Shopping cart management
- Checkout process
- Menu navigation

## Features

- **Page Object Model (POM)**: Clean, maintainable test architecture
- **TypeScript**: Type-safe test code
- **Custom Fixtures**: Reusable test fixtures for page objects
- **Global Setup**: Automated session management for authenticated tests
- **Multi-browser Support**: Tests run on Chromium with the ability to run with Firefox, and WebKit
- **Parallel Execution**: Tests run in parallel for faster execution, default is 3 workers 
- **Reporting**: HTML reports with screenshots, videos, and traces
- **CI/CD**: GitHub Actions workflow included


## Prerequisites

- **Node.js**: v18 or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sauce-playwright
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install --with-deps
   ```

## Running Tests

### Run All Tests

```bash
npm test
# or
yarn test
```

### Run Tests in Specific Browser

```bash
# Chromium (default)
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# WebKit (Safari)
npx playwright test --project=webkit
```

### Run Specific Test File

```bash
npx playwright test tests/login/login.spec.ts
```

### Run Tests with Tags

```bash
# Run only login tests
npx playwright test --grep @login

# Run shopping tests
npx playwright test --grep @shopping
```

### Run Tests in Headed Mode

```bash
# Set environment variable in .env file copied from .env_example
HEADLESS=false
```

### View Test Report

After running tests, view the HTML report:

```bash
npx playwright show-report
```

### Other Useful Commands

```bash
# Format code
yarn format

# Lint code
yarn lint

# Rebuild the whole project
yarn rebuild
```

## Why Playwright?

### 1. **Modern and Reliable**
- Auto-waiting for elements eliminates flaky tests
- Reliable execution across all modern browsers

### 2. **Fast Execution**
- Parallel test execution out of the box
- Efficient browser context management

### 3. **Excellent Developer Experience**
- TypeScript support with great type safety
- Has debugging tools
- Nice documentation and community support

### 4. **Features**
- **Auto-waiting**: Automatically waits for elements to be actionable
- **Network interception**: Mock API responses and verify network calls
- **Multi-browser**: Test across Chromium, Firefox, and WebKit
- **Screenshots & Videos**: Automatic capture on failure
- **Trace viewer**: Step-by-step execution replay

### 5. **Perfect for Simple Sites**
- **Easy setup**: Minimal configuration required
- **Simple API**: Intuitive commands like `click()`, `fill()`, `expect()`

### 6. **CI/CD Integration**
- Works seamlessly with GitHub Actions
- Built-in retry mechanisms for flaky tests
- Parallel execution reduces CI time

### 7. **Cost-Effective**
- Open-source and free
- No licensing costs
- Active community support

## Test Architecture

### Custom Fixtures

Tests use custom fixtures for easy access to page objects:

```typescript
test('Example test', async ({ loginPage, productsPage }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addToCart('Sauce Labs Backpack');
});
```

### Global Setup

The `global-setup.ts` file automatically creates an authenticated session before tests run, allowing tests to skip the login step when using `storageState`.

## Configuration

### Environment Variables

Copy a `.env_example` file to `.env`:

```env
BASE_URL=https://www.saucedemo.com/
HEADLESS=true
WORKERS=2
```

### Playwright Configuration

Key settings in `playwright.config.ts`:

- **Base URL**: `https://www.saucedemo.com/`
- **Test ID Attribute**: `data-test`
- **Timeout**: 20 seconds
- **Retries**: 2 retries on CI
- **Workers**: 3 parallel workers (configurable)
- **Reporters**: HTML and list reporters

### Test Data

Test data is centralized in:
- `fixtures/base.ts`: User credentials
- `testData/products.ts`: Product information

## CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:
- Runs tests on push and pull requests
- Tests chromium with the ability to run on other platforms 
- Generates and uploads html test report
- List report for local and CI details
- Runs in headless mode


### Best Practices

1. **Use test steps**: Organize test actions with `test.step()`
2. **Use page objects**: Never interact with the page directly in tests
3. **Use data-test attributes**: Prefer `getByTestId()` over CSS selectors
4. **Add meaningful assertions**: Use descriptive expect statements
5. **Tag tests**: Use tags like `@login`, `@shopping` for organization

