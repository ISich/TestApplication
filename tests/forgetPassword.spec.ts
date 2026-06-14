import { test, expect } from '@playwright/test';
import { URLS } from './helpers/urls';

test.describe('Forgot Password page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URLS.forgotPassword, {
      waitUntil: 'domcontentloaded',
    });
  });

  test('empty email - massage', async ({ page }) => {
    await page.getByRole('button', { name: 'Retrieve password' }).click();

    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  });

  test('email without at @ - massege', async ({ page }) => {
    await page.getByRole('textbox', { name: 'E-mail' }).fill('qwqwqw');
    await page.getByRole('button', { name: 'Retrieve password' }).click();

    await expect(page.getByText('Please enter a valid email address.')).toBeVisible();
  });

  test('email without domain - Error', async ({ page }) => {
    await page.getByRole('textbox', { name: 'E-mail' }).fill('qw@qwe');
    await page.getByRole('button', { name: 'Retrieve password' }).click();

    await expect(page.getByText('Your email is invalid!')).toBeVisible();
  });

  test('valid email - redirect', async ({ page }) => {
    await page.getByRole('textbox', { name: 'E-mail' }).fill('qwe@qweqwe.com');
    await page.getByRole('button', { name: 'Retrieve password' }).click();

    await expect(page.getByText('An e-mail has been sent to you')).toBeVisible();
  });

  test('valid email - redirect 2', async ({ page }) => {
    await page.getByRole('textbox', { name: 'E-mail' }).fill('qwe@qweqwe.123');
    await page.getByRole('button', { name: 'Retrieve password' }).click();

    await expect(page.getByText('An e-mail has been sent to you')).toBeVisible();
  });
});