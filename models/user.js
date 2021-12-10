const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 2,
        maxLength: 100
    },
    email: {
        type: String,
        require: true
    },
    preferences: {
        type: String,
    },
    zipCode: {
        type: Number,
        default: 1000
    },
    captured: {
        type: Boolean,
        default: false
    },
    lastSeen: String
})