const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BaseUserSchema = require('../BaseUser').BaseUserSchema

const Client = new Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'BaseUserSchema',
        required: true
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: [],
        default: ""
    }
})

const ClientSignUp = BaseUserSchema.discriminator('client', Client)

module.exports = { ClientSignUp }
