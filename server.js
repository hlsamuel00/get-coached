const express = require('express')
const app = express()
const logger = require('morgan')

// Process dotenv configuration
require('dotenv').config({ path: './config/config.env' })



// Logger configuration
if (process.env.NODE_ENV === 'development'){
    app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))
}

// Listening port configuration
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}; you better go catch it!!`)
})