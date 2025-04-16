const express = require('express')
const router = require('express').Router()
const Blog = require('../models/blog')

router.use(express.json())

router.get('/', async (_request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

router.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = router
