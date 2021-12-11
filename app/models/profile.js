const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new mongoose.Schema({
    userId: {
        //tell mongoose it's looking for a user id
        type: Schema.Types.ObjectId,
        //refer to that schema
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    photo: String,
    liked: Array,
    visited: Array,
    matchedUsers: Array
})

profileSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
})

module.exports = mongoose.model('Profile', profileSchema)