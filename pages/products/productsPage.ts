import {expect} from '@playwright/test';
import {Product} from '../../testData/products';
import {InventoryPage} from '../base/inventory';

export class ProductsPage extends InventoryPage {
  readonly elements = {
    title: () => this.page.getByTestId('title'),
    inventoryItemAddToCartButton: () =>
      this.page.locator('button[data-test^="add-to-cart-"]'),
  };

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
    await this.page.waitForLoadState('domcontentloaded');
  }
  async addToCart(title: string): Promise<void> {
    const itemContainer = this.inventoryElements.inventoryItemContainer(title);
    await expect(
      itemContainer,
      `Item container for ${title} is not visible`,
    ).toBeVisible();
    await itemContainer
      .locator(this.elements.inventoryItemAddToCartButton())
      .click();
  }
  async verifyItemInfo(product: Product): Promise<void> {
    const itemContainer = this.inventoryElements.inventoryItemContainer(
      product.title,
    );
    await expect(itemContainer).toBeVisible();
    await expect(
      itemContainer.locator(this.inventoryElements.inventoryItemDescription()),
    ).toHaveText(product.description);
    await expect(
      itemContainer.locator(this.inventoryElements.inventoryItemPrice()),
    ).toHaveText(product.price);
  }
}
