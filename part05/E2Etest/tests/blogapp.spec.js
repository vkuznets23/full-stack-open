const { test, expect, describe } = require('@playwright/test')

describe('blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
  })

  test('logging in', async ({ page }) => {
    await page.getByRole('textbox').first().fill('vikatest')
    await page.getByRole('textbox').last().fill('testpass')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('You are logged in')).toBeVisible()
    await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
  })
})
