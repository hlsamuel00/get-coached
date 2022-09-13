const mongoose = require("mongoose")
const Schema = mongoose.Schema

const baseOptions = {
    discriminatorKey: "profileType",
    collection: "role",
    timestamps: true
}

const BaseUserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        first: {
            type: String,
            trim: true,
            required: true
        },
        middle: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true,
            required: true
        },
        suffix: {
            type: String,
        }
    },
    gender: {
        
    },
    ethnicity: {

    },
    ratings: [{

    }],
    avgRating: {
        type: Number,
    },
    location: {

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, baseOptions)

module.exports.BaseUserSchema = mongoose.model('BaseUserSchema', BaseUserSchema)