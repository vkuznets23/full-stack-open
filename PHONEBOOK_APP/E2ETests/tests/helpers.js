const addContact = async (page, name, phone) => {
  await page.getByTestId('name').fill(name)
  await page.getByTestId('phone').fill(phone)
  await page.getByRole('button', { name: 'add' }).click()
}

module.exports = { addContact }
