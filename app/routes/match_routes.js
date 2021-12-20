const express = require('express')
// jsonwebtoken docs: https://github.com/auth0/node-jsonwebtoken
const crypto = require('crypto')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
// bcrypt docs: https://github.com/kelektiv/node.bcrypt.js
const bcrypt = require('bcrypt')
// pull in error types and the logic to handle them and set status codes
const errors = require('../../lib/custom_errors')
const axios = require('axios')

const BadParamsError = errors.BadParamsError
const BadCredentialsError = errors.BadCredentialsError
const Restaurant = require('../models/restaurant')
const Profile = require('../models/profile')
const User = require('../models/user')
const mongoose = require('mongoose')

// instantiate a router (mini app that only handles routes)
const router = express.Router()
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

const removeBlanks = require('../../lib/remove_blank_fields')

// CREATE a pending match in a user's array
router.post('/pendingMatches/:profileId', requireToken, (req, res, next) => {
    Profile.findById(req.params.profileId)
        .then(foundProfile => {
            foundProfile.pendingMatches.push(req.body.senderProfile)
            return foundProfile.save()
        })
        .then(resp => {
            res.json(resp)
        })
        .catch(next)
})

module.exports = router