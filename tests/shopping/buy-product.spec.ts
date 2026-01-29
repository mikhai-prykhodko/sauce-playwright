import {test, expect, standardUserSession} from '../../fixtures/base';
import {PRODUCTS} from '../../testData/products';
import {faker} from '@faker-js/faker';
test.use({storageState: standardUserSession});
test.describe('Shopping Tests @shopping', () => {
  test.beforeEach(async ({productsPage}) => {
    await test.step('Open home page', async () => {
      await productsPage.goto();
    });
  });
  test('Verify successful purchase for backpack @e2e-purchase', async ({
    productsPage,
    cartPage,
    checkoutPage,
    overviewPage,
  }) => {
    const userInformation = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
    await test.step('Verify products page is displayed', async () => {
      await expect(productsPage.elements.title()).toBeVisible();
      await expect(productsPage.elements.title()).toHaveText('Products');
    });
    await test.step('Verify backpack info', async () => {
      await productsPage.verifyItemInfo(PRODUCTS.sauceLabsBackpack);
    });
    await test.step('Add backpack to cart', async () => {
      await productsPage.addToCart(PRODUCTS.sauceLabsBackpack.title);
    });
    await test.step('Open cart and verify items', async () => {
      await cartPage.open();
      await cartPage.verifyItemInfo(PRODUCTS.sauceLabsBackpack);
      await cartPage.verifyNumberOfItems(1);
    });
    await test.step('Click on checkout button', async () => {
      await cartPage.checkout();
    });
    await test.step('Verify checkout page is displayed', async () => {
      await expect(checkoutPage.elements.title()).toBeVisible();
      await expect(checkoutPage.elements.title()).toHaveText(
        'Checkout: Your Information',
      );
    });
    await test.step('Fill user information', async () => {
      await checkoutPage.fillUserInformation(
        userInformation.firstName,
        userInformation.lastName,
        userInformation.postalCode,
      );
    });
    await test.step('Continue to Overview Page', async () => {
      await checkoutPage.clickContinueButton();
    });
    await test.step('Verify overview page is displayed', async () => {
      await expect(overviewPage.elements.title()).toBeVisible();
      await expect(overviewPage.elements.title()).toHaveText(
        'Checkout: Overview',
      );
    });
    await test.step('Verify item info', async () => {
      await overviewPage.verifyItemInfo(PRODUCTS.sauceLabsBackpack);
    });
    await test.step('Verify total info', async () => {
      await overviewPage.verifyTotalInfo([PRODUCTS.sauceLabsBackpack]);
    });
    await test.step('Click finish button', async () => {
      await overviewPage.clickFinishButton();
    });
    await test.step('Verify checkout complete page is displayed', async () => {
      await overviewPage.verifyCompleteHeader();
    });
    await test.step('Click back home button', async () => {
      await overviewPage.clickBackHomeButton();
    });
    await test.step('Verify products page is displayed', async () => {
      await expect(productsPage.elements.title()).toBeVisible();
      await expect(productsPage.elements.title()).toHaveText('Products');
    });
  });
  test('Verify that user can add and remove items from cart @add-remove-item', async ({
    productsPage,
    cartPage,
  }) => {
    await test.step('Verify products page is displayed', async () => {
      await expect(productsPage.elements.title()).toBeVisible();
      await expect(productsPage.elements.title()).toHaveText('Products');
    });
    await test.step('Add backpack to cart', async () => {
      await productsPage.addToCart(PRODUCTS.sauceLabsBackpack.title);
    });
    await test.step('Open cart and verify items', async () => {
      await cartPage.open();
      await cartPage.verifyItemInfo(PRODUCTS.sauceLabsBackpack);
      await cartPage.verifyNumberOfItems(1);
    });
    await test.step('Remove item from cart', async () => {
      await cartPage.removeItem(PRODUCTS.sauceLabsBackpack.title);
    });
    await test.step('Verify cart is empty', async () => {
      await expect(cartPage.elements.cartItesCount()).toBeHidden();
    });
  });
  test('Verify that user can add multiple items to cart @add-multiple-items', async ({
    productsPage,
    cartPage,
  }) => {
    for (const product of Object.values(PRODUCTS)) {
      console.log(product.title);
      await test.step(`Add ${product.title} to cart`, async () => {
        await productsPage.addToCart(product.title);
      });
    }
    await test.step('Open cart and verify items count', async () => {
      await cartPage.open();
      for (const product of Object.values(PRODUCTS)) {
        await cartPage.verifyItemInfo(product);
      }
      await cartPage.verifyNumberOfItems(Object.keys(PRODUCTS).length);
    });
  });
});
