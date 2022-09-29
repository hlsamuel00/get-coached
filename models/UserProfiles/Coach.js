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
        type: String
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    availableStatus: {
        type: Boolean,
        //enum: ["Available", "Not Available"],
        default: true
    },
    experience: [{

    }],
})

const CoachSignUp = BaseUserSchema.discriminator('coach', Coach)

module.exports = { CoachSignUp }