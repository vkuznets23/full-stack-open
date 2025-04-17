const express = require('express')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.use(express.json())

router.get('/', async (_request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'title and url are required' })
    }

    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      url: body.url,
      user: user.id,
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
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
  } catch (error) {
    next(error)
  }
})

module.exports = router
