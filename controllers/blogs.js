const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const morgan = require('morgan')
require('dotenv').config()
morgan.token('body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
  return ''
})
blogRouter.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
blogRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
  .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'Blog not found' })
      }
    })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = blogs.length > 0
    ? Math.max(...blogs.map(n => n.id))
    : 0
  return maxId + 1
}

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogRouter.get('/info', (request, response) => {
  //const maxId = blogs.length
  //response.send(`Phonebook has info for ${maxId} people<br> ${new Date()}`)
  Blog.countDocuments({})
    .then(count => {
      response.send(`Phonebook has info for ${count} people<br> ${new Date()}`)
    })
})

module.exports = blogRouter