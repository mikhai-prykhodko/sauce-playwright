import {test, expect, USERS} from '../../fixtures/base';

test.describe('Login Tests @login', () => {
  test.beforeEach(async ({loginPage}) => {
    await loginPage.goto();
  });

  test('Verify successful login @successful-login', async ({
    loginPage,
    page,
    productsPage,
  }) => {
    await test.step('Login to the system with the correct credentials', async () => {
      await loginPage.login(
        USERS.standardUser.username,
        USERS.standardUser.password,
      );
    });
    await test.step('Verify login is successful', async () => {
      await expect(page).toHaveURL(/.*inventory\.html/);
      await expect(productsPage.elements.title()).toBeVisible();
      await expect(productsPage.elements.title()).toHaveText('Products');
    });
  });

  test('Verify error message on un-successful login @un-successful-login', async ({
    loginPage,
  }) => {
    await test.step('Login to the system with the invalid credentials', async () => {
      await loginPage.login(
        USERS.invalidUser.username,
        USERS.invalidUser.password,
      );
    });
    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.elements.errorMessage()).toContainText(
        'Username and password do not match any user in this service',
      );
    });
  });

  test('Verify error message on locked out user @locked-user-login', async ({
    loginPage,
  }) => {
    await test.step('Login to the system with the locked out user', async () => {
      await loginPage.login(
        USERS.lockedOutUser.username,
        USERS.lockedOutUser.password,
      );
    });
    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.elements.errorMessage()).toContainText(
        'Sorry, this user has been locked out.',
      );
    });
  });

  test('Verify error message on empty username @empty-user', async ({
    loginPage,
  }) => {
    await test.step('Login to the system with the empty username', async () => {
      await loginPage.login('', USERS.standardUser.password);
    });
    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.elements.errorMessage()).toContainText(
        'Username is required',
      );
    });
  });

  test('Verify error message on empty password @empty-password', async ({
    loginPage,
  }) => {
    await test.step('Login to the system with the empty password', async () => {
      await loginPage.login(USERS.standardUser.username, '');
    });
    await test.step('Verify error message is displayed', async () => {
      await expect(loginPage.elements.errorMessage()).toContainText(
        'Password is required',
      );
    });
  });
});
