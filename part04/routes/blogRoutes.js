const express = require('express');
const Blog = require('../modules/blogSchema');

const router = express.Router();

router.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Ищем блог по ID в базе данных
      const blog = await Blog.findById(id);
  
      if (!blog) {
        // Если блог не найден, возвращаем статус 404
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      // Возвращаем найденный блог
      res.status(200).json(blog);
    } catch (error) {
      // Если произошла ошибка при поиске, возвращаем статус 400
      res.status(400).json({ error: 'Invalid ID format' });
    }
  });
  
router.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  });

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Попытка найти и удалить блог по ID
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        // Если блог не найден, возвращаем 404
        return res.status(404).json({ error: 'Blog not found' });
      }
      // Успешное удаление
      res.status(204).end(); // Статус 204 - No Content
    } catch (error) {
      // Если ошибка при удалении (например, неправильный ID), возвращаем 400
      res.status(400).json({ error: 'Invalid ID' });
    }
  });

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(400).json({ error: 'Invalid ID or data format' });
    }
  });

module.exports = router;