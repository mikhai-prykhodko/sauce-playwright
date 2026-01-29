import {test as base, Page} from '@playwright/test';
import {LoginPage} from '../pages/login/loginPage';
import {CartPage} from '../pages/cart/cartPage';
import {CheckoutPage} from '../pages/checkout/checkoutPage';
import {ProductsPage} from '../pages/products/productsPage';
import {OverviewPage} from '../pages/checkout/overviewPage';
import {MenuPage} from '../pages/sideMenu/menuPage';

export const USERS = {
  standardUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problemUser: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceGlitchUser: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
};
export const standardUserSession = 'sessions/standardUserSession.json';

export const test = base.extend<{
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  overviewPage: OverviewPage;
  menuPage: MenuPage;
  page: Page;
}>({
  page: async ({page}, use) => {
    await use(page);
    //close pages
    for (const context of page.context()?.browser()?.contexts() ?? []) {
      await context.close();
    }
  },
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({page}, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({page}, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({page}, use) => {
    await use(new CheckoutPage(page));
  },
  overviewPage: async ({page}, use) => {
    await use(new OverviewPage(page));
  },
  menuPage: async ({page}, use) => {
    await use(new MenuPage(page));
  },
});

export {expect} from '@playwright/test';
