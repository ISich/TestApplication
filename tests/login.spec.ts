import { test, expect } from '@playwright/test';
import { URLS } from './helpers/urls';

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URLS.login, { waitUntil: 'domcontentloaded' });
  });

  test('successful login with valid cred', async ({ page }) => {
    await page.fill('#username', 'practice');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.alert-success')).toContainText(
      'You logged into a secure area!'
    );
  });

  test('login with invalid username and password', async ({ page }) => {
    await page.fill('#username', 'wrongUser');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.alert-danger')).toContainText(
      'Your password is invalid!'
    );
  });

  test('login with valid username and invalid password', async ({ page }) => {
    await page.fill('#username', 'practice');
    await page.fill('#password', 'wrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.alert-danger')).toContainText(
      'Your password is invalid!'
    );
  });

  test('login empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.alert-danger')).toBeVisible();
  });
});