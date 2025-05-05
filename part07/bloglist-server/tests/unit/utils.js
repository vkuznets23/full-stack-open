const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

//function returns the blog with the most likes
const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((prev, current) => {
    return current.likes > prev.likes ? current : prev
  })
  return favBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // Group blogs by author
  const grouped = _.groupBy(blogs, 'author')

  // Map to array of { author, blogs }
  const authorsWithCounts = _.map(grouped, (authorBlogs, author) => ({
    author,
    blogs: authorBlogs.length,
  }))

  return _.maxBy(authorsWithCounts, 'blogs')

  // const mostBlogsAuthor = blogs.reduce((prev, cur) => {
  //   return cur.blogs > prev.blogs ? cur : prev
  // })

  // return mostBlogsAuthor.author
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const grouped = _.groupBy(blogs, 'author')
  /*
  {
    Alice: [
      { title: 'Blog A', author: 'Alice', likes: 2 },
      { title: 'Blog C', author: 'Alice', likes: 7 },
      { title: 'Blog D', author: 'Alice', likes: 3 }
    ],
    Bob: [
      { title: 'Blog B', author: 'Bob', likes: 5 },
      { title: 'Blog E', author: 'Bob', likes: 4 }
    ]
  }
  */
  const authorsWithLikes = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes'),
  }))

  return _.maxBy(authorsWithLikes, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
