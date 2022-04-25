const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// Use the router to get to the route
blogRouter.get('/', async (request, response, next) => {
  // When the promise is returned, find with the schema
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {

  // Access request body
  const body = new Blog(request.body)

  // Assign request body to model
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  try {
    // Make post request
    const savedBlog = await blog.save()
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

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter