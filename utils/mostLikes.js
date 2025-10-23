const _ = require('lodash');

function mostLikes(blogs) {
  if (_.isEmpty(blogs)) {
    return null;
  }

  const grouped = _.groupBy(blogs, 'author');

  const authorLikes = _.map(grouped, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  }));

  return _.maxBy(authorLikes, 'likes');
}

module.exports = { mostLikes }