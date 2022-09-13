const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BaseUserSchema = require('../BaseUser').BaseUserSchema

const Coach = new Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'BaseUserSchema',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: [],
        default: ""
    },
    experience: [{

    }],
})

const CoachSignUp = BaseUserSchema.discriminator('coach', Coach)

module.exports = { CoachSignUp }