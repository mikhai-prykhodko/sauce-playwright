import {chromium, type FullConfig} from '@playwright/test';
import {standardUserSession} from '../../fixtures/base';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

async function globalSetup(config: FullConfig) {
  const sessionsDir = path.resolve(process.cwd(), 'sessions');
  fs.mkdirSync(sessionsDir, {recursive: true});
  console.log('globalSetup');
  const {baseURL} = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await context.tracing.start({screenshots: true, snapshots: true});
    await page.goto(baseURL || '');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill(process.env.PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    await page.waitForURL('**/inventory.html');
    await page.waitForTimeout(1000);
    console.log('BEFORE storageState');
    const sessionPath = path.resolve(process.cwd(), standardUserSession);
    await context.storageState({path: sessionPath});
    console.log('AFTER storageState - saved to:', sessionPath);
    await context.tracing.stop({path: 'trace.zip'});
    await browser.close();
  } catch (error) {
    await context.tracing.stop({
      path: './test-results/failed-setup-trace.zip',
    });
    await browser.close();
    throw error;
  }
}

export default globalSetup;
