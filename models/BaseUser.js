const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Options for BaseUserSchema
const baseOptions = {
    discriminatorKey: "profileType",
    collection: "User",
    timestamps: true
}

// Base User Schema
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

// Password hash middleware.
BaseUserSchema.pre("save", function save(next){
    const user = this
    if (!user.isModified("password")) {
      return next()
    }
    bcrypt.genSalt(15, (err, salt) => {
      if(err){
        return next(err)
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err){
          return next(err)
        }
        user.password = hash
        next()
      })
    })
})
  
// Helper method for validating user password.
  
BaseUserSchema.methods.comparePassword = function comparePassword(candidatePassword,cb){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch)
    })
}

module.exports.BaseUserSchema = mongoose.model('BaseUserSchema', BaseUserSchema)