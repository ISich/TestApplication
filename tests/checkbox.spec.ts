import { test, expect } from '@playwright/test';
import { URLS } from './helpers/urls';

test.describe('Checkboxes page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URLS.checkboxes, {
      waitUntil: 'domcontentloaded',
    });
  });

  test('activate checkbox', async ({ page }) => {
    const checkbox1 = page.getByRole('checkbox', {
      name: 'Checkbox 1',
    });

    await expect(checkbox1).not.toBeChecked();
    await checkbox1.check();

    await expect(checkbox1).toBeChecked();
  });

  test('deactivate checkbox', async ({ page }) => {
    const checkbox2 = page.getByRole('checkbox', {
      name: 'Checkbox 2',
    });

    await expect(checkbox2).toBeChecked();
    await checkbox2.uncheck();

    await expect(checkbox2).not.toBeChecked();
  });

  test('multiple checkboxes', async ({ page }) => {
    const checkbox1 = page.getByRole('checkbox', {
      name: 'Checkbox 1',
    });
    const checkbox2 = page.getByRole('checkbox', {
      name: 'Checkbox 2',
    });

    await checkbox1.check();
    await checkbox2.uncheck();
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();

    await checkbox1.uncheck();
    await checkbox2.check();

    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();
  });

  test('checkbox reload', async ({ page }) => {
    const checkbox1 = page.getByRole('checkbox', {
      name: 'Checkbox 1',
    });
    const checkbox2 = page.getByRole('checkbox', {
      name: 'Checkbox 2',
    });

    await checkbox1.check();
    await checkbox2.uncheck();

    await page.reload({
      waitUntil: 'domcontentloaded',
    });

    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();
  });
});