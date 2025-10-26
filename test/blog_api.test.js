const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  console.log('before each');
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
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

  test.only('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
   assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

  test.only('the first note is Clean Code', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(e => e.title)
    assert(contents.includes('Clean Code'))
  })

  test.only('a valid blog can be added', async () => {
    const newBlog = {
      author: "New Author",
      title: "New Blog Post",
      url: "http://example.com/new-blog",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(n => n.title)
    assert(contents.includes('New Blog Post'))
  })

  test.only('a blog without url or title is not added', async () => {
    const invalidBlog = {
      author: "Invalid Author",
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(invalidBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})