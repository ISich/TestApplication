import { test, expect } from '@playwright/test';
import { URLS } from './helpers/urls';

test.describe('Key page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URLS.keyPresses, { waitUntil: 'domcontentloaded' });
  });

  test('press Escape', async ({ page }) => {
    await page.keyboard.press('Escape');

    await expect(page.locator('#result')).toContainText('You entered: ESCAPE');
  });

  test('press Control', async ({ page }) => {
    await page.keyboard.press('Control');

    await expect(page.locator('#result')).toContainText('You entered: CONTROL');
  });
  

  test('press Enter', async ({ page }) => {
    await page.keyboard.press('Enter');

    await expect(page.locator('#result')).toContainText('You entered: ENTER');
  });
  
  test('press Backspace', async ({ page }) => {
    await page.keyboard.press('Backspace');

    await expect(page.locator('#result')).toContainText('You entered: BACK_SPACE');
  });
  
  //test('press Tab', async ({ page }) => {});
  //test('press Shift', async ({ page }) => {});
  //test('press Alt', async ({ page }) => {});
  
});