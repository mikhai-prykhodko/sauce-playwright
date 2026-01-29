import {expect} from '@playwright/test';
import {BasePage} from '../base/basePage';

export class CheckoutPage extends BasePage {
  readonly elements = {
    title: () => this.page.getByTestId('title'),
    firstNameInput: () => this.page.getByTestId('firstName'),
    lastNameInput: () => this.page.getByTestId('lastName'),
    postalCodeInput: () => this.page.getByTestId('postalCode'),
    continueButton: () => this.page.getByTestId('continue'),
    errorMessage: () => this.page.getByTestId('error'),
  };
  async fillUserInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.elements.firstNameInput().fill(firstName);
    await this.elements.lastNameInput().fill(lastName);
    await this.elements.postalCodeInput().fill(postalCode);
  }
  async verifyErrorMessage(message: string): Promise<void> {
    await expect(this.elements.errorMessage()).toHaveText(message);
  }
  async clickContinueButton(): Promise<void> {
    await this.elements.continueButton().click();
  }
}
