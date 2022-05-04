const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response, next) => {
  // When the promise is returned, find with the schema
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  // Access request body
  const body = new Blog(request.body)

  if (!request.user) {
    return response.status(401).json({
      error: 'user token missing or invalid'
    })
  }

  const user = request.user

  // Assign request body to model
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    // Make post request
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async(request, response, next) => {
  try {
    const body = request.body
    const blog = {
      title: body.content,
      author: body.content,
      url: body.content,
      likes: body.content
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(updatedBlog)

  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

  const blogToDelete = await Blog.findById(request.params.id)

  if (!request.user) {
    return response.status(401).json({
      error: 'user token missing or invalid'
    })
  }

  const user = request.user

  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).json({
      error: 'must be creator of entry to delete entry'
    })
  }

  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter