  const _ = require('lodash');
  
  const dummy = (blogs) => {
    return 1;
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentBlog) => accumulator + currentBlog.likes, 0);
  }
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0]);
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
    const groupByAuthor = _.groupBy(blogs, 'author');
    let   maxBlogs = 0;
    let   topAuthor = null;

    // Iterate over each author in the grouped object
    for (const author in groupByAuthor) {
      const countAuthors = groupByAuthor[author].length;
      if (countAuthors > maxBlogs) {
        maxBlogs = countAuthors;
        topAuthor = author;
      }
    }

    return {
      author: topAuthor,
      blogs: maxBlogs,
    };
  }

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
  }