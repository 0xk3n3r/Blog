const { test, describe } = require('node:test')
const assert = require('assert')
const { mostBlogs } = require('../utils/mostBlogs') 

describe('mostBlogs', () => {
  test('of a list with multiple blogs', () => {
    const blogs = [
      {
        author: "Robert C. Martin",
        title: "Clean Code",
        url: "http://example.com/clean-code",
        likes: 10
      },
      {
        author: "Edsger W. Dijkstra",
        title: "On the Art of Programming",
        url: "http://example.com/art-programming",
        likes: 15
      },
      {
        author: "Robert C. Martin",
        title: "The Clean Architecture",
        url: "http://example.com/clean-architecture",
        likes: 20
      },
      {
        author: "Michael Chan",
        title: "Some Blog",
        url: "http://example.com/some-blog",
        likes: 5
      },
      {
        author: "Robert C. Martin",
        title: "Refactoring",
        url: "http://example.com/refactoring",
        likes: 8
      }
    ]

    const result = mostBlogs(blogs)
    console.log('Test result:', result)
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 })
  })
})
