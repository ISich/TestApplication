import { test, expect } from '@playwright/test';
import { URLS } from './helpers/urls';

test.describe('Autocomplete page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URLS.autocomplete, {
      waitUntil: 'domcontentloaded',
    });
  });

  test('search Canada', async ({ page }) => {
    const countryInput = page.getByRole('textbox', {
      name: 'Country name',
    });

    await countryInput.fill('Ca');
    await page.getByText('Canada').click();
    await expect(countryInput).toHaveValue('Canada');
  });
});