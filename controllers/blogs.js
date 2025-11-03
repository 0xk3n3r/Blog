const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const morgan = require('morgan')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
morgan.token('body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
  return ''
})
blogRouter.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
blogRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

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
    likes: body.likes,
  }
  let user = null
  if (body.userId) {
    user = await User.findById(body.userId)
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (user) {
      user.blogs = user.blogs.concat(updatedBlog._id)
      await user.save()}
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async(request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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
  const body = request.body
  //const user = await User.findById(body.userId)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  if (!body.title || !body.url || !body.author) {
    return response.status(400).json({ error: 'Title or author or URL are required' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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