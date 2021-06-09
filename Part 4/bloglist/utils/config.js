require('dotenv').config()

const PORT =  process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

//'mongodb+srv://hitesh:fullstackopen@phonebook.jwgqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
module.exports = {
  MONGODB_URI,
  PORT
}