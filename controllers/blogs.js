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
blogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/:id', async(request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.put('/:id', async(request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async(request, response, next) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id)
    if (result) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }
  } catch (error) {
    next(error)
  }
})
/*  Blog.findByIdAndDelete(request.params.id)
const generateId = () => {
  const maxId = blogs.length > 0
    ? Math.max(...blogs.map(n => n.id))
    : 0
  return maxId + 1
}
*/

blogRouter.post('/', async(request, response, next) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/info', async(request, response) => {
  //const maxId = blogs.length
  //response.send(`Phonebook has info for ${maxId} people<br> ${new Date()}`)
  try {
    const count = await Blog.countDocuments({})
    response.send(`Phonebook has info for ${count} people<br> ${new Date()}`)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter