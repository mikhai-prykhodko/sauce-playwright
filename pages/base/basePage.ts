import {Page} from '@playwright/test';

/**
 * Base class of common page functions
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
