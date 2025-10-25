const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
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
  },
]


beforeEach(async () => {
  console.log('before each');
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
})

describe('when there is initially some blogs saved', () => {
  test.only('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test.only('there are 5 blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test.only('the first note is Clean Code', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(e => e.title)
    assert(contents.includes('Clean Code'))
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})