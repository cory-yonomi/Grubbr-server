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
        unique: true
    },
    photos: {
        type: String
    },
    location: {
        type: Array,
        required: true
    },
    image_url: String,
    categories: Array,
    rating: Number,
    price: String,
    comments: [commentSchema],
    users: Array,
})

module.exports = mongoose.model('Restaurant', restaurantSchema)