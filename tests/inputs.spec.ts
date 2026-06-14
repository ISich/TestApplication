import { test, expect } from '@playwright/test';
import { URLS } from './helpers/urls';

test.describe('Inputs page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URLS.inputs, {
      waitUntil: 'domcontentloaded',
    });
  });

  test('fill all inputs and verify output', async ({ page }) => {
    await page.getByRole('spinbutton', {
      name: 'Input: Number',
    }).fill('12');
    await page.getByRole('textbox', {
      name: 'Input: Text',
    }).fill('qwe');
    await page.getByRole('textbox', {
      name: 'Input: Password',
    }).fill('qweqwe');
    await page.getByRole('textbox', {
      name: 'Input: Date',
    }).fill('2001-01-02');

    await page.getByRole('button', {
      name: 'Display Inputs',
    }).click();

    await expect(page.getByText('12')).toBeVisible();
    await expect(
      page.getByText('qwe', { exact: true })
    ).toBeVisible();
    await expect(
      page.getByText('qweqwe')
    ).toBeVisible();
    await expect(
      page.getByText('2001-01-02')
    ).toBeVisible();
  });

  test('clear all inputs', async ({ page }) => {
    const numberInput = page.getByRole('spinbutton', {
      name: 'Input: Number',
    });
    const textInput = page.getByRole('textbox', {
      name: 'Input: Text',
    });
    const passwordInput = page.getByRole('textbox', {
      name: 'Input: Password',
    });
    const dateInput = page.getByRole('textbox', {
      name: 'Input: Date',
    });

    await numberInput.fill('12');
    await textInput.fill('qwe');
    await passwordInput.fill('qweqwe');
    await dateInput.fill('2001-01-02');

    await page.getByRole('button', {
      name: 'Clear Inputs',
    }).click();

    await expect(numberInput).toHaveValue('');
    await expect(textInput).toHaveValue('');
    await expect(passwordInput).toHaveValue('');
    await expect(dateInput).toHaveValue('');
  });
});