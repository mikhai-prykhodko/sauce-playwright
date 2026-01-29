import {BasePage} from '../base/basePage';

/**
 * Base class of common page functions
 */
export class MenuPage extends BasePage {
  readonly elements = {
    sideMenu: () => this.page.locator('#react-burger-menu-btn'),
    allItemsLink: () => this.page.getByTestId('inventory-sidebar-link'),
    aboutLink: () => this.page.getByTestId('about-sidebar-link'),
    logoutLink: () => this.page.getByTestId('logout-sidebar-link'),
    resetAppLink: () => this.page.getByTestId('reset-sidebar-link'),
  };

  async open(): Promise<void> {
    await this.elements.sideMenu().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
  async clickAllItemsLink(): Promise<void> {
    await this.elements.allItemsLink().click();
  }
  async clickAboutLink(): Promise<void> {
    await this.elements.aboutLink().click();
  }
  async clickLogoutLink(): Promise<void> {
    await this.elements.logoutLink().click();
  }
}
