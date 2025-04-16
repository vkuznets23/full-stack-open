const supertest = require('supertest')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../../app')
const helpers = require('./helpers')
const Contact = require('../../models/contact')

const fs = require('fs')
const path = require('path')

const api = supertest(app)

// test for all API REQUESTS (simple tests)
describe('Contacts API', () => {
  beforeEach(async () => {
    console.log('clearing database...')
    await Contact.deleteMany({})

    const contactObject = helpers.initialContacts.map(
      (contact) => new Contact(contact)
    )
    const promiseArray = contactObject.map((contact) => contact.save())
    await Promise.all(promiseArray)

    console.log('done initializing')
  })
  describe('Schema & Validation', () => {
    test('blog has id not _id', async () => {
      const resp = await api.get('/api/persons')
      const contact = resp.body[0]
      assert.ok(contact.id)
      assert.strictEqual(contact._id, undefined)
    })
    test('missing name', async () => {
      const newContact = {
        number: '9034535345',
      }
      const resp = await api.post('/api/persons').send(newContact).expect(400)
    })
    test('missing phone', async () => {
      const newContact = {
        name: 'Viktoriia',
      }
      const resp = await api.post('/api/persons').send(newContact).expect(400)
    })
  })
  describe('CRUD operations', () => {
    test('GET REQUEST works', async () => {
      const resp = await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.strictEqual(resp.body.length, helpers.initialContacts.length)
    })

    test('GET_ID REQUEST works', async () => {
      const resp = await api.get('/api/persons')
      const contact = resp.body[0]

      const contactById = await api
        .get(`/api/persons/${contact.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(contactById.body.name, contact.name)
      assert.strictEqual(contactById.body.phone, contact.phone)
    })

    test('DELETE REQUEST works', async () => {
      const responseAtStart = await api.get('/api/persons')
      const contactToDelete = responseAtStart.body[0]

      await api.delete(`/api/persons/${contactToDelete.id}`).expect(204)
      const responseAtEnd = await api.get('/api/persons')
      assert.strictEqual(
        responseAtEnd.body.length,
        responseAtStart.body.length - 1
      )
    })

    test('POST REQUEST works', async () => {
      const requestBody = {
        name: 'John Doe',
        phone: '123-456-7890',
      }

      const photoPath = path.join(__dirname, 'test-photo.jpg')

      const resp = await api
        .post('/api/persons')
        .expect(200)
        .field('name', requestBody.name)
        .field('phone', requestBody.phone)
        .attach('photo', photoPath)

      assert.strictEqual(resp.body.name, requestBody.name)
      assert.strictEqual(resp.body.phone, requestBody.phone)

      assert.ok(resp.body.photoUrl)
      assert.ok(resp.body.photoUrl.startsWith('data:image/jpeg;base64,'))

      // check that contact is in db
      // const contactsAfterPost = await api.get('/api/persons')
      // console.log(contactsAfterPost)

      // assert.strictEqual(
      //   contactsAfterPost.body.length,
      //   helpers.initialContacts.length + 1
      // )

      // const addedContact = contactsAfterPost.body.find(
      //   (c) => c.name === requestBody.name
      // )
      // assert.ok(addedContact)
      // assert.ok(addedContact.photoBuffer)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
