import {expect} from '@playwright/test';
import {Product} from '../../testData/products';
import {InventoryPage} from '../base/inventory';
/**
 * Base class of common page functions
 */
export class CartPage extends InventoryPage {
  readonly elements = {
    title: () => this.page.getByTestId('title'),
    catIcon: () => this.page.getByTestId('shopping-cart-link'),
    cartItesCount: () => this.page.getByTestId('shopping-cart-badge'),
    removeCartItemButton: () =>
      this.page.locator('button[data-test^="remove-"]'),
    checkoutButton: () => this.page.getByTestId('checkout'),
    continueShoppingButton: () => this.page.getByTestId('continue-shopping'),
    itemQuantity: () => this.page.getByTestId('item-quantity'),
  };

  async verifyItemInfo(product: Product, quantity?: number): Promise<void> {
    const itemContainer = this.inventoryElements.inventoryItemContainer(
      product.title,
    );
    await expect(
      itemContainer.locator(
        this.inventoryElements.inventoryItemName(product.title),
      ),
    ).toBeVisible();
    await expect(
      itemContainer.locator(this.inventoryElements.inventoryItemDescription()),
    ).toHaveText(product.description);
    await expect(
      itemContainer.locator(this.inventoryElements.inventoryItemPrice()),
    ).toHaveText(product.price);
    if (quantity) {
      await expect(
        itemContainer.locator(this.elements.itemQuantity()),
      ).toHaveText(quantity.toString());
    }
  }
  async verifyNumberOfItems(quantity: number): Promise<void> {
    await expect(this.elements.cartItesCount()).toHaveText(quantity.toString());
  }
  async removeItem(title: string): Promise<void> {
    const itemContainer = this.inventoryElements.inventoryItemContainer(title);
    await itemContainer.locator(this.elements.removeCartItemButton()).click();
  }
  async checkout(): Promise<void> {
    await this.elements.checkoutButton().click();
  }
  async continueShopping(): Promise<void> {
    await this.elements.continueShoppingButton().click();
  }
  async open(): Promise<void> {
    await this.elements.catIcon().click();
  }
}
