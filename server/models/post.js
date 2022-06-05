const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['TO LEARN','LEARN', 'LEARNED']
    },
    users:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Post',postSchema)