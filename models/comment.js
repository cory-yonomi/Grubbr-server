const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        body: {
            type: String,
            required: true
        },
        userId: [userSchema]
    },
    {
        timestamps: true
    }
)

// export the commentSchema so we can use it as a subdocument in our place model
// note: we don't need to create or export a model for a subdoc
module.exports = commentSchema