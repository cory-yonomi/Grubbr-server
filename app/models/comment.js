const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        body: String,
        user: {
            // to create a reference, the type should be ObjectId
            type: Schema.Types.ObjectId,
            // ref is also needed, so we can populate the owner
            // Note: populate means replacing the owner id with the Person document
            ref: 'Profile'
        }
    },
    {
        timestamps: true
    }
)

// export the commentSchema so we can use it as a subdocument in our place model
// note: we don't need to create or export a model for a subdoc
module.exports = commentSchema