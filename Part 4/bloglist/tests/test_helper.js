const Blog = require('../models/blog')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

const initialBlogs = [
  {
    title: 'Hunger games',
    author: 'Candice',
    url: 'hungergames.com',
    likes: 100,
  },
  {
    title: 'Spiderman',
    author: 'Stan Lee',
    url: 'MarvelComics.com',
    likes: 500,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}