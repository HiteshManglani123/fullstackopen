const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  // logger.error(error)

  if (error.name === 'CastError') {
    logger.error('CAST ERROR')
    return response.status(400).send({ error: 'malformatted id' })
  }
  else  if (error.name === 'ValidatorError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const token =  request.token
    console.log('here');
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.user = await User.findById(decodedToken.id)
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}