const express = require('express')

// Mongoose models
const Restaurant = require('../models/Restaurant')

// throws custom error
const customErrors = require('../../lib/custom_errors')

// sends 404 when non-existent document is requested
const handle404 = customErrors.handle404

// this is middleware that will remove blank fields from `req.body`, e.g.
// { person: { title: '', text: 'foo' } } -> { person: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

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

module.exports = router