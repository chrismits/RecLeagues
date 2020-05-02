/*
Mongoose schema for Administrators. Exports Admin model
*/

var mongoose = require('mongoose')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
require('dotenv').config()


var adminSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Error: Name too short']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (em) {
                return /^\w+([\.-]?\w+)*@tufts.edu/.test(em)
            }
        }
    },
    hash: String,
    salt: String,
    pronouns: {
        type: String,
        required: false
    },
    leagues: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League'
    }],
    created: {
        type: Date,
        default: Date.now
    }
})

// Authentication Middleware
adminSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

adminSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === hash;
}

//generateJWT: A JSON Web token
adminSchema.methods.generateJWT = function() {
    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 2)

    return jwt.sign({
        _id: this._id,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
        admin: true
    }, process.env.JWT_SECRET)
}

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
