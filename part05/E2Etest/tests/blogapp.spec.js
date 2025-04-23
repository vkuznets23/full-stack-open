const {
  test,
  expect,
  describe,
  beforeEach,
  waitFor,
} = require('@playwright/test')
import { login, createBlog } from './helpers'

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
    await login(page, 'vikatest', 'testpass')
    await expect(page.getByText('Vika Testova logged in')).toBeVisible()
  })

  test('error logging in', async ({ page }) => {
    await login(page, 'vikatest', 'wrongpass')
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  test('loged in user can create a new blog', async ({ page }) => {
    await login(page, 'vikatest', 'testpass')

    await page.getByRole('button', { name: 'create blog' }).click()
    await expect(page.getByText('title')).toBeVisible()
    await expect(page.getByText('author')).toBeVisible()
    await expect(page.getByText('url')).toBeVisible()

    await createBlog(page, 'New title', 'New author', 'http//newurl')

    await expect(page.getByTestId('blog-title')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'New title' })).toBeVisible()
  })

  test('blog can be liked', async ({ page }) => {
    await login(page, 'vikatest', 'testpass')

    await page.getByRole('button', { name: 'create blog' }).click()
    await createBlog(page, 'New title', 'New author', 'http//newurl')

    await page.getByRole('button', { name: 'view' }).click()

    await expect(page.getByText('Likes: 0')).toBeVisible()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('Likes: 1')).toBeVisible()
  })

  test('user can delete', async ({ page }) => {
    await login(page, 'vikatest', 'testpass')

    await page.getByRole('button', { name: 'create blog' }).click()
    await createBlog(page, 'New title', 'New author', 'http//newurl')

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
    await login(page, 'vikatest', 'testpass')

    await page.getByRole('button', { name: 'create blog' }).click()
    await createBlog(page, 'New title', 'New author', 'http//newurl')

    await page.getByRole('button', { name: 'view' }).click()

    await expect(page.getByRole('button', { name: 'delete' })).toBeVisible()

    await page.getByRole('button', { name: 'logout' }).click()

    await login(page, 'vikatest2', 'testpass')
    await expect(page.getByText('Vika Testova2 logged in')).toBeVisible()

    await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
  })

  test('blogs are arranged in the order according to the likes', async ({
    page,
  }) => {
    await login(page, 'vikatest', 'testpass')

    await page.getByRole('button', { name: 'create blog' }).click()
    await createBlog(page, 'New title', 'New author', 'http//newurl')
    await expect(page.getByRole('heading', { name: 'New title' })).toBeVisible()

    const firstViewButton = await page
      .getByTestId('blog')
      .filter({ hasText: 'New title' })
      .getByRole('button', { name: 'view' })
    await firstViewButton.click()

    const firstLikeButton = page
      .getByTestId('blog')
      .filter({ hasText: 'New title' })
      .getByRole('button', { name: 'like' })

    await firstLikeButton.click()
    await expect(page.getByText('Likes: 1')).toBeVisible()
    await firstLikeButton.click()
    await expect(page.getByText('Likes: 2')).toBeVisible()

    await page.getByRole('button', { name: 'create blog' }).click()
    await createBlog(page, 'New title2', 'New author2', 'http//newurl2')
    await expect(
      page.getByRole('heading', { name: 'New title2' })
    ).toBeVisible()

    const secondViewButton = await page
      .getByTestId('blog')
      .filter({ hasText: 'New title2' })
      .getByRole('button', { name: 'view' })
    await secondViewButton.click()

    const secondLikeButton = page
      .getByTestId('blog')
      .filter({ hasText: 'New title2' })
      .getByRole('button', { name: 'like' })
    await secondLikeButton.click()
    await expect(page.getByText('Likes: 1')).toBeVisible()
    await secondLikeButton.click()
    await expect(page.getByText('Likes: 2')).toBeVisible()
    await secondLikeButton.click()
    await expect(page.getByText('Likes: 3')).toBeVisible()

    const blogs = await page
      .locator('[data-testid="blog-title"]')
      .allTextContents()
    expect(blogs[0]).toContain('New title2')
    expect(blogs[1]).toContain('New title')
  })
})
