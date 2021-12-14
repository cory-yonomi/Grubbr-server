const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = require('./comment')

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    yelpId: {
        type: String,
        required: true,
    },
    location: {
        type: Array,
        required: true
    },
    comments: [commentSchema],
    users: Array,
})

module.exports = mongoose.model('Restaurant', restaurantSchema)