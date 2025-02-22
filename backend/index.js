const app = require('./app')
const PORT = process.env.PORT || 8080;
const logger = require('./utils/logger')


app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})