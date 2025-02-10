import { faker } from '@faker-js/faker'
import fs from 'fs'

const generateContacts = (count) => {
  return Array.from({ length: count }, (_, id) => ({
    id: id + 1,
    name: faker.person.fullName(),
    phone: `+${faker.string.numeric(2)}-${faker.string.numeric(
      3
    )}-${faker.string.numeric(3)}-${faker.string.numeric(4)}`,
    photo: faker.image.avatar(),
  }))
}

const contacts = generateContacts(7)

//save to js file
const jsContent = `export const contacts = ${JSON.stringify(
  contacts,
  null,
  2
)};`
fs.writeFileSync('contacts.js', jsContent, 'utf8')

console.log('✅ file created: contacts.json')

// to run the script:
//node generateData.js
