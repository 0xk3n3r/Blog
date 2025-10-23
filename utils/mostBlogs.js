const _ = require('lodash');

function mostBlogs(blogs) {
  if (_.isEmpty(blogs)) {
    return null; 
  }

  const groupedByAuthor = _.groupBy(blogs, 'author');

  const authorCounts = Object.entries(groupedByAuthor).map(([author, blogs]) => ({
    author,
    blogs: blogs.length
  }));

  const maxAuthor = _.maxBy(authorCounts, 'blogs');

  return maxAuthor;
}

module.exports = { mostBlogs }
