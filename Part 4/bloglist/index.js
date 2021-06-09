
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')


const server = http.createServer(app)
// eslint-disable-next-line no-undef


// eslint-disable-next-line no-undef


server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
