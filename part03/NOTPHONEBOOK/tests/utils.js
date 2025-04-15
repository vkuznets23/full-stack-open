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

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
