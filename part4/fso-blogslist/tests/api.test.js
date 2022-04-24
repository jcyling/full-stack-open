const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'There',
    author: 'is',
    url: 'a',
    likes: 2
  },
  {
    title: 'Where',
    author: 'There',
    url: 'is',
    likes: 8
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe(('api tests'), () => {
  test('get list of blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('verify id property of blog posts', async () => {
    const response = await api.get('/api/blogs')
    const content = response.body.map(item => item)
    expect(content[0].id).toBeDefined()
  })

  test('post a new entry', async () => {
    const newEntry = {
      title: 'Books',
      author: 'Hermione Granger',
      url: 'www.google.com',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newEntry)
      .expect(201)

    const response = await api.get('/api/blogs')
    const content = response.body.map(item => item.content)
    expect(content).toHaveLength(3)
  })

  test('verify if likes property defaults to 0 if missing', async () => {
    const newEntry = {
      title: 'Wizards',
      author: 'of Wizarding World',
      url: 'www.google.com'
    }

    await api
      .post('/api/blogs')
      .send(newEntry)
      .expect(201)

    const response = await api.get('/api/blogs')
    const content = response.body.map(item => item)
    const lastEntry = content[2]
    console.log(lastEntry)

    expect(lastEntry.likes).toEqual(0)
  })

  test('rejects missing title or url', async () => {
  })
})

afterAll(() => {
  mongoose.connection.close()
})