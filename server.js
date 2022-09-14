const express = require('express')
const app = express()
const passport = require('passport')
const logger = require('morgan')
const connectDB = require('./config/db')

// Passport configuration
require('./config/passport')(passport)

// Connect to database
connectDB()

// Dotenv configuration
require('dotenv').config({ path: './config/config.env' })


// Logger configuration
if (process.env.NODE_ENV === 'development'){
    app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))
}

// Listening port configuration
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}; you better go catch it!!`)
})