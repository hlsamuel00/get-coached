const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @description     Get Homepage
// @route           GET /
router.get('/', homeController.getHomePage)

// @description     Get Login Page
// @route           GET /login
router.get('/login', authController.getLogin)

// @description     Get Signup Page
// @route           GET /signup
router.get('/signup', authController.getSignup)

// @description     Login User
// @route           POST /login
router.post('/login', authController.postLogin)

// @description     Signup User
// @route           POST /signup
router.post('/signup', authController.postSignup)

// @description     Logout User
// @route           GET /logout
router.get('/logout', authController.getLogout)

module.exports = router