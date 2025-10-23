function mostBlogs(blogs) {
  if (blogs.length === 0) {
    return null;
  }

  const authorCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {})

  let maxBlogs = 0;
  let authorWithMostBlogs = '';

  for (const [author, count] of Object.entries(authorCount)) {
    if (count > maxBlogs) {
      maxBlogs = count;
      authorWithMostBlogs = author;
    }
  }

  return {
    author: authorWithMostBlogs,
    blogs: maxBlogs
  }
}

module.exports = { mostBlogs }
