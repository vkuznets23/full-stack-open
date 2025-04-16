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
  console.log('clearing database...')
  await Blog.deleteMany({})

  console.log('saving initial blogs...')
  const blogObjects = initialData.map((data) => new Blog(data))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)

  console.log('done initializing')
})

test.only('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('blogs list contains the correct number of blogs', async () => {
  console.log('entered test')
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, initialData.length)
})

test.only('blog has id not _id', async () => {
  console.log('entered test')
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blog = response.body[0]
  assert.ok(blog.id)
  assert.strictEqual(blog._id, undefined)
})

test.only('POST request works', async () => {
  console.log('entered test')
  const responseBefore = await api.get('/api/blogs')
  const initialLen = responseBefore.body.length

  const newBlog = {
    title: 'New Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const responseAfter = await api.get('/api/blogs')
  const lenAfterPost = responseAfter.body.length

  assert.strictEqual(lenAfterPost, initialLen + 1)

  const titles = responseAfter.body.map((blog) => blog.title)
  assert.ok(titles.includes('New Blog Title'))
})

test.only('if likes property is missing it set to 0', async () => {
  console.log('entered test')

  const newBlog = {
    title: 'New Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test.only('title is missing', async () => {
  const blogNoTitle = {
    author: 'Test Author',
    url: 'http://testurl.com',
  }

  const response = await api.post('/api/blogs').send(blogNoTitle).expect(400)
})

test.only('url is missing', async () => {
  const blogNoUrl = {
    title: 'New Blog Title',
    author: 'Test Author',
  }
  const response = await api.post('/api/blogs').send(blogNoUrl).expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
