import {test, expect, standardUserSession} from '../../fixtures/base';

test.use({storageState: standardUserSession});
test.describe('Test main menu functionality @menu', () => {
  test.beforeEach(async ({productsPage}) => {
    await test.step('Open home page', async () => {
      await productsPage.goto();
    });
  });
  test('Verify logout via menu @logout', async ({loginPage, menuPage}) => {
    await test.step('Open Sidebar', async () => {
      await menuPage.open();
    });
    await test.step('Click on the logout link', async () => {
      await menuPage.clickLogoutLink();
    });
    await test.step('Verify login page is displayed', async () => {
      await expect(loginPage.elements.loginButton()).toBeVisible();
    });
  });
  test('Verify about link leads to main site @about', async ({menuPage}) => {
    await test.step('Open Sidebar', async () => {
      await menuPage.open();
    });
    await test.step('Click on the about link', async () => {
      await menuPage.clickAboutLink();
    });
    await test.step('Verify about page is displayed', async () => {
      expect(menuPage.page.url()).toContain('https://saucelabs.com/');
    });
  });
});
