import {BasePage} from '../base/basePage';

/**
 * Base class of common page functions
 */
export class LoginPage extends BasePage {
  readonly elements = {
    username: () => this.page.getByTestId('username'),
    password: () => this.page.getByTestId('password'),
    loginButton: () => this.page.getByTestId('login-button'),
    errorMessage: () => this.page.getByTestId('error'),
    errorMessagesdas: () => this.page.locator('h3[data-test="error"]'),
  };

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
  async login(username: string, password: string): Promise<void> {
    await this.elements.username().fill(username);
    await this.elements.password().fill(password);
    await this.elements.loginButton().click();
  }
}
