const passport = require('passport')
const validator = require('validator')
const Coach = require('../models/UserProfiles/Coach')
const Client = require('../models/UserProfiles/Client')

module.exports = {
    // Get login page
    getLogin: (req,res) => {
        if(req.user){
            res.redirect('/dashboard')
        }
        res.render('login', {
            layout: 'login'
        })
    },

    // Process login request
    postLogin: (req,res,next) => {
        const validationErrors = []
        if(!validator.isEmail(req.body.email)){
            validationErrors.push({ msg: "Please enter valid email address." })
        }
        if(validator.isEmpty(req.body.password)){
            validationErrors.push({ msg: "Password cannot be blank."})
        }
        if(validationErrors.length){
            req.flash('errors', validationErrors)
            res.redirect('/login')
        }
        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

        passport.authenticate('local', (err, user, info) => {
            if(err){
                next(err) 
            }
            if(!user){
                req.flash('errors', info)
                res.redirect('/login')
            }
            req.logIn(user, (err) => {
                if(err){
                    next(err) 
                }
                req.flash('success', { msg: 'Success! You are logged in.' })
                res.redirect(req.session.returnTo || '/dashboard')
            })
          })(req, res, next)
      
    },

    // Process logout request
    getLogout: (req,res) => {
        req.logout(() => {
            console.log('User has logged out.')
        })
        req.session.destroy((err) => {
            if(err){
                console.log('Error: Failed to destroy user session during logout.', err)
                req.user = null
                res.redirect('/')
            }
        })
    },

    // Get signup page
    getSignup: (req,res) => {
        if(req.user){
            res.redirect('/dashboard')
        }
        res.render('signup', {
            title: "Create account"
        })
    },

    // Process signup request
    postSignup: (req,res,next) => {
        const validationErrors = []
        const emailVal = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{1,}$/g

        // Validation Conditionals
        if(!validator.isEmail(req.body.email)){
            validationErrors.push({ msg: 'Please enter a valid email address.'})
        }
        if(!validator.isLength(req.body.password, { min: 8 , max: 16 })){
            validationErrors.push({ msg: 'Please enter a password between 8 and 16 characters.'})
        }
        if(validator.contains(req.body.password, 'password')){
            validationErrors.push({msg: "Password cannot contain the word 'password'"})
        }
        if(!emailVal.test(req.body.password)){
            validationErrors.push({ msg: "Password must contain one number (0-9) and one special character (#?!@$ %^&*-)." })
        }
        if(req.body.password !== req.body.confirmPassword){
            validationErrors.push({ msg: 'Passwords do not match.' })
        }
        if(validationErrors.length){
            req.flash('errors', validationErrors)
            res.redirect('../signup')
        }

        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
        
        // New Coach Creation
        if(req.body.profile = 'Coach'){
            
            const coach = new Coach({
                email: req.body.email,
                password: req.body.password,
                name:{
                    first: req.body.firstName,
                    middle: req.body.middleName,
                    last: req.body.lastName,
                    suffix: req.body.suffix
                },
                gender: req.body.gender,
                ethnicity: req.body.ethnicity,
                location: req.body.location
            })

            //Coach profile validation (ensuring no exsting profile exists)
            Coach.findOne({ email: req.body.email }, (err, existingUser) => {
                if(err){
                    next(err)
                }
                if(existingUser){
                    req.flash('errors', { msg: 'Account with that email address already exists.'})
                    res.redirect('../signup')
                }
                coach.save((err) => {
                    if(err){
                        next(err)
                    }
                    req.logIn(user, (err) => {
                        if(err){
                            next(err)
                        }
                        res.redirect('/dashboard')
                    })
                })
            })

        }
        // New Client Creation
        if(req.body.profile = "Client"){

            const client = new Client({
                email: req.body.email,
                password: req.body.password,
                name:{
                    first: req.body.firstName,
                    middle: req.body.middleName,
                    last: req.body.lastName,
                    suffix: req.body.suffix
                },
                gender: req.body.gender,
                ethnicity: req.body.ethnicity,
                location: req.body.location
            })

            //Client profile validation (ensuring no exsting profile exists)
            Client.findOne({ email: req.body.email }, (err, existingUser) => {
                if(err){
                    next(err)
                }
                if(existingUser){
                    req.flash('errors', { msg: 'Account with that email address already exists.'})
                    res.redirect('../signup')
                }
                client.save((err) => {
                    if(err){
                        next(err)
                    }
                    req.logIn(user, (err) => {
                        if(err){
                            next(err)
                        }
                        res.redirect('/dashboard')
                    })
                })
            })
        }
    }
}