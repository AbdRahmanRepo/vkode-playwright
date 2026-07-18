import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('playwright');
  await page.locator('iframe[name="a-5s652gez0exw"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('football');
  await page.getByRole('button', { name: 'Google Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByText('du simulated ranksSee more').click();
});