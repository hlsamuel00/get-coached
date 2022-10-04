const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BaseUserSchema = require('../BaseUser').BaseUserSchema

const Client = new Schema({
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'BaseUserSchema',
    },
    image: {
        type: String,
    },
    readyStatus: {
        type: Boolean,
        //enum: ["Looking", "Not Looking" ],
        default: false
    }
})

const ClientSignUp = BaseUserSchema.discriminator('client', Client)

module.exports = ClientSignUp
