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
const Restaurant = require('../models/Restaurant')
const User = require('../models/user')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

const removeBlanks = require('../../lib/remove_blank_fields')

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// show all restaurants
router.get('/restaurants', requireToken, (req, res, next) => {
    Restaurant.find({})
        .then(rest => {
        res.json(rest)
        })
    .catch(next)
})

// create a restaurant if it doesn't already exist
router.post('/restaurants', requireToken, (req, res, next) => {
    Restaurant.findOneAndUpdate({
        name: req.body.name,
        location: req.body.location,
        yelpId: req.body.yelpId,
        comments: [],
        users: []
    },
        { $set: {
        name: req.body.name,
        location: req.body.location,
        yelpId: req.body.yelpId,
        comments: [],
        users: []
    }},
        { upsert: true })
        .then(createdRest => {
        res.json(createdRest)
        })
        .catch(next)
})

// delete a restaurant
router.delete('/restaurant/:restaurantId', requireToken, (req, res, next) => {
    Restaurant.findOne({
        _id: req.params.profileId,
    })
        .then(foundRestaurant => {
        return foundRestaurant.deleteOne()
        })
        .then(() => res.sendStatus(204))
        // if error => throw to handler
        .catch(next)
})

module.exports = router