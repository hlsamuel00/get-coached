const express = require('express')
const app = express()
const passport = require('passport')
const logger = require('morgan')
logger.token('body', (req) => JSON.stringify(req.body))
const connectDB = require('./config/db')
const flash = require('express-flash')
const mainRoutes = require('./routes/main')

// Dotenv configuration
require('dotenv').config({ path: './config/config.env' })

// Passport configuration
require('./config/passport')(passport)

// Body parser
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// Connect to database
connectDB()

// View configuration
app.set('view engine', 'ejs')
app.use(express.static('public'))


// Logger configuration
if (process.env.NODE_ENV === 'development'){
    app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))
}

// Routes
app.use('/', mainRoutes)

// Flash Configuration
app.use(flash())

// Listening port configuration
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}; you better go catch it!!`)
})