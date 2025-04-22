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

    await request.post('http://localhost:3002/api/users', {
      data: {
        username: 'vikatest2',
        name: 'Vika Testova2',
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

  test('loged in user can create a new blog', async ({ page }) => {
    await page.getByRole('textbox').first().fill('vikatest')
    await page.getByRole('textbox').last().fill('testpass')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Vika Testova logged in')).toBeVisible()

    await page.getByRole('button', { name: 'create blog' }).click()
    await expect(page.getByText('title')).toBeVisible()
    await expect(page.getByText('author')).toBeVisible()
    await expect(page.getByText('url')).toBeVisible()

    await page.getByTestId('title').fill('New title')
    await page.getByTestId('author').fill('New author')
    await page.getByTestId('url').fill('http//newurl')
    await page.getByRole('button', { name: 'create' }).click()

    await expect(page.getByTestId('blog-title')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'New title' })).toBeVisible()
  })

  test('blog can be likes', async ({ page }) => {
    await page.getByRole('textbox').first().fill('vikatest')
    await page.getByRole('textbox').last().fill('testpass')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Vika Testova logged in')).toBeVisible()

    await page.getByRole('button', { name: 'create blog' }).click()
    await expect(page.getByText('title')).toBeVisible()
    await expect(page.getByText('author')).toBeVisible()
    await expect(page.getByText('url')).toBeVisible()

    await page.getByTestId('title').fill('New title')
    await page.getByTestId('author').fill('New author')
    await page.getByTestId('url').fill('http//newurl')
    await page.getByRole('button', { name: 'create' }).click()

    await expect(page.getByTestId('blog-title')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'New title' })).toBeVisible()

    await page.getByRole('button', { name: 'view' }).click()

    await expect(page.getByText('Likes: 0')).toBeVisible()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('Likes: 1')).toBeVisible()
  })

  test('user can delete', async ({ page }) => {
    await page.getByRole('textbox').first().fill('vikatest')
    await page.getByRole('textbox').last().fill('testpass')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Vika Testova logged in')).toBeVisible()

    await page.getByRole('button', { name: 'create blog' }).click()

    await page.getByTestId('title').fill('New title')
    await page.getByTestId('author').fill('New author')
    await page.getByTestId('url').fill('http//newurl')
    await page.getByRole('button', { name: 'create' }).click()

    await expect(page.getByTestId('blog-title')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'New title' })).toBeVisible()

    await page.getByRole('button', { name: 'view' }).click()

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe(
        'Are you sure you want to delete this blog?'
      )
      await dialog.accept()
    })
    await page.getByRole('button', { name: 'delete' }).click()

    await expect(page.locator('[data-testid="blog-title"]')).toBeHidden()
    await expect(page.getByText('Blog deleted successfully')).toBeVisible()
  })

  test('delete button is only for user who created blog', async ({ page }) => {
    await page.getByRole('textbox').first().fill('vikatest')
    await page.getByRole('textbox').last().fill('testpass')
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'create blog' }).click()

    await page.getByTestId('title').fill('New title')
    await page.getByTestId('author').fill('New author')
    await page.getByTestId('url').fill('http//newurl')
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'view' }).click()

    await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()

    await page.getByRole('button', { name: 'logout' }).click()

    await page.getByRole('textbox').first().fill('vikatest2')
    await page.getByRole('textbox').last().fill('testpass')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Vika Testova2 logged in')).toBeVisible()

    await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
  })
})
