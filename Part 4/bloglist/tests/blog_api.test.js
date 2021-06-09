const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog =>  {
    blog.save()
  })
  await Promise.all(promiseArray)
})

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier is called id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[1].id).toBeDefined()
})


describe('testing the creation of blogs', () => {

  test('posting a new blog', async () => {
    const user = {
      username: 'root',
      password: 'secret'
    }

    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    console.log(result.request.body)
    // let newBlog ={
    //   title: 'Harry Potter',
    //   author: 'JK Rowling',
    //   url: 'Potter.nl',
    //   likes: 6,
    //   userId: '60aa24f52cba6410fc6a8ea6'
    // }
    // await api
    //   .post('/api/blogs')
    //   .set('Authorization', )
    //   .send(newBlog)
    //   .expect(201)
    //   .expect('Content-type', /application\/json/)

    // const response = await api.get('/api/blogs')
    // const blogs = response.body.map(blog => blog.title)
    // expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    // expect(blogs).toContain(
    //   'Harry Potter'
    // )
  })
})

test('default value of likes is 0', async () => {
  let newBlog ={
    title: 'Harry Potter',
    author: 'JK Rowling',
    url: 'Potter.nl',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body.map(blog => blog)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogs[blogs.length - 1].likes).toBe(0)
})

test('missing title and url are met with 400', async () => {
  let newBlog ={
    author: 'JK Rowling',
    likes: 6,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})