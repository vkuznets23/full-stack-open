const { test, describe } = require('node:test')
const assert = require('node:assert')
const helpers = require('./utils')

test('dummy returns one', () => {
  const blogs = ['blog1', 'blog2']
  const result = helpers.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go 1',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 0,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'Go 2',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Go 3',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go 4',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0,
    },
  ]

  const blogs = [
    { title: 'Blog A', author: 'Alice', likes: 2 },
    { title: 'Blog B', author: 'Bob', likes: 5 },
    { title: 'Blog C', author: 'Alice', likes: 7 },
    { title: 'Blog D', author: 'Alice', likes: 3 },
    { title: 'Blog E', author: 'Bob', likes: 4 },
  ]

  test('when list has only one blog', () => {
    const result = helpers.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('find a favourite blog', () => {
    const result = helpers.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go 4',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0,
    })
  })

  test('most blogs author', () => {
    const result = helpers.mostBlogs(blogs)
    console.log(helpers.mostBlogs(blogs))
    assert.deepStrictEqual(result, {
      author: 'Alice',
      blogs: 3,
    })
  })

  test('most likes author', () => {
    const result = helpers.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Alice', likes: 12 })
  })
})
