import {BasePage} from './basePage';
/**
 * Base class of common page functions
 */
export abstract class InventoryPage extends BasePage {
  readonly inventoryElements = {
    inventoryList: () => this.page.getByTestId('inventory-list'),
    inventoryItemName: (title: string) =>
      this.page.getByTestId('inventory-item-name').filter({hasText: title}),
    inventoryItemContainer: (title: string) =>
      this.page
        .getByTestId('inventory-item')
        .filter({has: this.inventoryElements.inventoryItemName(title)}),
    inventoryItemDescription: () =>
      this.page.getByTestId('inventory-item-desc'),
    inventoryItemPrice: () => this.page.getByTestId('inventory-item-price'),
  };
}
