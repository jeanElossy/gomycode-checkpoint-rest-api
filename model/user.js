const mongoose = require('mongoose');

const PostModel = mongoose.model(
    'node-api-rest',
    {
        nom : {
            type: String,
            require: true
        },
        prenom : {
            type: String,
            require: true
        },
        date : {
            type: Date,
            default: Date.now
        }
    },
    'data'
)

module.exports = PostModel;