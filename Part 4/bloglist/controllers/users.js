const bcrypt = require('bcrypt')
const { response } = require('express')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    response.status(400).json({ error : 'Password must be longer than 3 charecters' })
  } else {
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = User({
      blogs: [],
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
})

usersRouter.get('/', async (request, response)  => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, likes: 1, url: 1 })
  response.json(users)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter
