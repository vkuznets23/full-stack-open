import { faker } from '@faker-js/faker'
import fs from 'fs'
import axios from 'axios'
import process from 'node:process'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.UNSPLASH_ACCESS_KEY)
const unsplashURL =
  'https://api.unsplash.com/photos/random?query=portrait&content_filter=high&orientation=squarish'

const getPhotoFromUnsplash = async () => {
  try {
    const resp = await axios(unsplashURL, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    })
    return resp.data.urls.small
  } catch (err) {
    console.error('❌ Error fetching photo:', err.response?.data || err.message)
    return null
  }
}

const generateContacts = async (count) => {
  const contacts = []

  for (let i = 0; i < count; i++) {
    const photo = await getPhotoFromUnsplash()

    contacts.push({
      id: i + 1,
      name: faker.person.fullName(),
      phone: `+${faker.string.numeric(2)}-${faker.string.numeric(
        3
      )}-${faker.string.numeric(3)}-${faker.string.numeric(4)}`,
      photo: photo || 'https://via.placeholder.com/150',
    })
  }

  return contacts
}

const saveContactsToFile = async () => {
  const contacts = await generateContacts(7)

  // save as JSON object with the key contacts
  const jsonContent = JSON.stringify({ contacts }, null, 2)
  fs.writeFileSync('contacts.json', jsonContent, 'utf8')

  console.log('✅ file created: contacts.json')
}

saveContactsToFile()

// //save to js file
// // const jsContent = `export const contacts = ${JSON.stringify(
// //   contacts,
// //   null,
// //   2
// // )};`
// // fs.writeFileSync('contacts.js', jsContent, 'utf8')

// // to run the script:
// //node generateData.js
