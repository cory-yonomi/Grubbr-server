const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')




// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError
const Profile = require('../models/profile')
const User = require('../models/user')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// READ user's profile
router.get('/profile', requireToken, (req, res, next) => {
    res.json(req.user._id)
})

// CREATE user's profile
router.post('/profile', requireToken, (req, res, next) => {
    Profile.create({
        userId: req.user._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        zipCode: req.body.zipCode
    })
        .then(createdProfile => {
            res.json(createdProfile)
        })
        .catch(err => console.err(err))
})

module.exports = router