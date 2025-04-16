const supertest = require('supertest')
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../../models/blog')
const app = require('../../app')

const api = supertest(app)

const initialData = [
  { title: 'blabal', author: 'String', url: 'String', likes: 4 },
  { title: 'blabal22', author: 'String22', url: 'String22', likes: 8 },
]

beforeEach(async () => {
  await Blog.deleteMany({}) // clear up db
  await new Blog(initialData[0]).save() // add new blog
  await new Blog(initialData[1]).save() // add new blog
})

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('blogs list contains the correct number of blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, initialData.length)
})

after(async () => {
  await mongoose.connection.close()
})
