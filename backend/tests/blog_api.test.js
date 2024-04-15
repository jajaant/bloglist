const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



test('returns the same number of blogs as there are in the database', async () => {

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDB()

  expect(response).toHaveLength(helper.initialBlogs.length)
})

test('one valid blog can be posted', async () => {
  const newBlog = {
    title: 'Canonical integer reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await helper.blogsInDB()
  expect(response).toHaveLength(helper.initialBlogs.length + 1)

  const contents = response.map(r => r.title)
  expect(contents).toContainEqual(
    'Canonical integer reduction'
  )
})

test('one blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToDelete = blogsAtStart[blogsAtStart.length -1]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDB()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length -1)

  const contents = blogsAtEnd.map(r => r.id)

  expect(contents).not.toContain(blogToDelete.id)
})

afterAll(async () => {
  await mongoose.connection.close()
})