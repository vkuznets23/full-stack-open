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
    const { title, url } = request.body
    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.status(200).json(updatedBlog)
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = router
