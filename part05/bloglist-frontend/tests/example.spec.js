// @ts-check
import { test, expect } from '@playwright/test';
/*
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/


test('application displays the login form by default', async ({page}) => {
  await page.goto('http://localhost:5173/');

  const loginForm = page.locator('//form');
  await expect(loginForm).toBeVisible();

  const usernameField = page.locator('input[name="Username"]');
  const passwordField = page.locator('input[password="Password"]');
  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();

  const loginButton = page.locator('button[type="Submit"]');
  await expect(loginButton).toBeVisible();
})

test('good login', async ({page}) => {
  await page.goto('http://localhost:5173/');

  await page.fill('input[name="Username"]', 'Vika');
  await page.fill('input[password="Password"]', 'schoolPas23');

  await page.click('button[type="submit"]');

  await expect(page.locator('h2')).toHaveText('Welcome, Viktoria!');
})

test('bad login', async ({page}) => {
  await page.goto('http://localhost:5173/');

  await page.fill('input[name="Username"]', 'Vika2');
  await page.fill('input[password="Password"]', '2schoolPas23');

  await page.click('button[type="submit"]');
  
  const errorMessage = page.getByText('Wrong credentials');
  await expect(errorMessage).toBeVisible();
})