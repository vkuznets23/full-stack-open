const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3002/api/testing/reset')

    //create user
    await request.post('http://localhost:3002/api/users', {
      data: {
        username: 'vikatest',
        name: 'Vika Testova',
        password: 'testpass',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
  })

  test('successful logging in', async ({ page }) => {
    await page.getByRole('textbox').first().fill('vikatest')
    await page.getByRole('textbox').last().fill('testpass')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Vika Testova logged in')).toBeVisible()
    await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
  })

  test('error logging in', async ({ page }) => {
    await page.getByRole('textbox').first().fill('vikatest')
    await page.getByRole('textbox').last().fill('wrongpass')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })
})
