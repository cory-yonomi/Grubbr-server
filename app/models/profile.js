const mongoose = require('mongoose')
const Schema = mongoose.Schema
const messageSchema = require('./message')
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
    bio: String,
    photo: String,
    liked: Array,
    visited: Array,
    pendingMatches: [{
        type: Schema.Types.ObjectId,
        //refer to that schema
        ref: 'Profile'
    }],
    matchedUsers: [{
        type: Schema.Types.ObjectId,
        //refer to that schema
        ref: 'Profile'
    }],
    messages: [messageSchema]
})

profileSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
})

module.exports = mongoose.model('Profile', profileSchema)

// user views potential matches
// user clicks match they'd like to connect with
    // clicked user is added to pendingMatches array
    // clicked user is notified with a message
// clicked user selects yes or no
    // if matched, add each user to other's matches array
    // notify user of match