const { test, expect, describe, beforeEach } = require('@playwright/test')
const { addContact } = require('./helpers')

describe('Phonebook App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await page.goto('http://localhost:5173')
  })
  test('front page can be opened', async ({ page }) => {
    const locator = page.getByRole('heading', { name: 'Contacts' })
    await expect(locator).toBeVisible()
  })

  test('add valid contact', async ({ page }) => {
    await page.getByTestId('toggle-button').click()
    await expect(page.getByText('*Name')).toBeVisible()
    await expect(page.getByText('*Phone')).toBeVisible()

    await addContact(page, 'Vika Testova', '+358 - 777 - 77 - 6666')

    await expect(
      page.getByRole('heading', { name: 'Vika Testova' })
    ).toBeVisible()
  })

  test('should not add contact with invalid phone', async ({ page }) => {
    await page.getByTestId('toggle-button').click()
    await addContact(page, 'Vika Testova', 'invalid-phone')

    await expect(page.getByText('is not a valid phone number')).toBeVisible()
  })

  test('should show error if name is missing', async ({ page }) => {
    await page.getByTestId('toggle-button').click()
    await addContact(page, '', '+358 - 777 - 77 - 6666')

    await expect(
      page.getByText('Please add both name and number')
    ).toBeVisible()
  })

  test('should filter contacts by name', async ({ page }) => {
    await page.getByTestId('toggle-button').click()
    await addContact(page, 'Vika Testova', '+358 - 777 - 77 - 6666')
    //mb unnecessary
    await expect(
      page.getByRole('heading', { name: 'Vika Testova' })
    ).toBeVisible()

    await addContact(page, 'John Doe', '+358 - 777 - 77 - 7777')
    //mb unnecessary
    await expect(page.getByRole('heading', { name: 'John Doe' })).toBeVisible()

    await page.getByTestId('search-input').fill('Vika')

    await expect(
      page.getByRole('heading', { name: 'Vika Testova' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'John Doe' })
    ).not.toBeVisible()
  })

  test('delete contact', async ({ page }) => {
    await page.getByTestId('toggle-button').click()
    await addContact(page, 'Vika Testova', '+358 - 777 - 77 - 6666')

    await page.getByTestId('delete-button').click()
    await page.locator('button:has-text("Yes")').click()
    await page.locator('button:has-text("Yes")').isHidden()

    await expect(
      page.getByRole('heading', { name: 'Vika Testova' })
    ).toBeHidden()
  })
})
