import {expect} from '@playwright/test';
import {InventoryPage} from '../base/inventory';
import {Product} from '../../testData/products';

export class OverviewPage extends InventoryPage {
  readonly elements = {
    title: () => this.page.getByTestId('title'),
    items: () => this.page.getByTestId('inventory-item'),
    subTotalValue: () => this.page.getByTestId('subtotal-label'),
    taxValue: () => this.page.getByTestId('tax-label'),
    totalValue: () => this.page.getByTestId('total-label'),
    finishButton: () => this.page.getByTestId('finish'),
    completeHeader: () => this.page.getByTestId('complete-header'),
    backHomeButton: () => this.page.getByTestId('back-to-products'),
  };
  async verifyItemInfo(product: Product): Promise<void> {
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
  }
  async verifyTotalInfo(products: Product[]): Promise<void> {
    let subTotal = 0;
    for (const product of products) {
      subTotal += parseFloat(product.price.replace('$', ''));
    }
    const tax: number = (subTotal * 8.00267) / 100;
    await expect(this.elements.subTotalValue()).toContainText(
      '$' + subTotal.toFixed(2).toString(),
    );
    await expect(this.elements.taxValue()).toContainText(
      '$' + tax.toFixed(2).toString(),
    );
    await expect(this.elements.totalValue()).toContainText(
      '$' + (tax + subTotal).toFixed(2).toString(),
    );
  }
  async clickFinishButton(): Promise<void> {
    await this.elements.finishButton().click();
  }
  async verifyCompleteHeader(): Promise<void> {
    await expect(this.elements.completeHeader()).toBeVisible();
    await expect(this.elements.completeHeader()).toHaveText(
      'Thank you for your order!',
    );
    await expect(this.elements.backHomeButton()).toBeVisible();
    await expect(this.elements.backHomeButton()).toHaveText('Back Home');
  }
  async clickBackHomeButton(): Promise<void> {
    await this.elements.backHomeButton().click();
  }
}
