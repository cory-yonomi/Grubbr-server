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

// instantiates router
const router = express.Router()

// GET (SHOW)
// GET /comments/<restaurant._id>/<comment._id>
router.get('/comments/:restaurantId/:commentId', requireToken, (req, res, next) => {
    Restaurant.findById(req.params.restaurantId)
        .then(restaurant => {
            //here we can select the comment by its id using a built in function
            return restaurant.comments.id(req.params.commentId)
        })
        .then(comment => res.status(200).json(comment.toJSON()))
        .catch(next)
})

// CREATE
// POST /comments/<restaurant.id>
router.post('/comments/:restaurantId', requireToken, (req, res, next) => {
    // find the restaurant in database
    Restaurant.findById(req.params.restaurantId)
        .then(restaurant => {
            // add (push) comment into the restaurant's comments array
            restaurant.comments.push(req.body.comment)
            // then save the restaurant
            return restaurant.save()
        })
        .then(restaurant => {
            // return the restaurant and send the status with json
            res.status(201).json({ restaurant: restaurant.toObject()})
        })
        // if any errors happen, send them to the handler
        .catch(next)
})

//DELETE
//DELETE /comments/<restaurant.id>/<comment.id>
router.delete('/comments/:restaurantId/:commentId', requireToken, (req, res, next) => {
    Comment.findById(req.params.commentId)
        .then(handle404)
        .then(comment => {
        // if there are no errors, delete the selected comment
        comment.deleteOne()
        })
        .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router