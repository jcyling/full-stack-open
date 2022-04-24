const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// Use the router to get to the route
blogRouter.get('/', async (request, response) => {
  // When the promise is returned, find with the schema
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  // Access request body
  const body = new Blog(request.body)

  // Assign request body to model
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  // Make async request
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

})

module.exports = blogRouter