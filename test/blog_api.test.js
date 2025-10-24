const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const api = supertest(app)


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 2)
})

test('the first blog is My First Blog', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(e => e.title)
  assert(titles.includes('My First Blog'))
})

after(async () => {
  await mongoose.connection.close()
})