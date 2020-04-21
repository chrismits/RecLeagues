/*
Mongoose schema for Player. Exports Player model
Notes:
    - Test cell-phone validator function
    - Added reference field for team
*/

var mongoose = require('mongoose')
require('mongoose-type-email')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
require('dotenv').config()


/* Entries for Player:
    - _id: ObjectId
    - first: String
    - last: String
    - cell: String
    - email: Email
    - signedWaiver: Boolean
    - team: ObjectId ('Team' reference) -> Decided to remove this
    - pronouns: String
    - created: Date
*/
var playerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    first: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'DB Error: First name too short!']
    },
    last: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'DB Error: Last name too short!']
    },
    cell: {
        type: String,
        required: false,
        validate: {
            validator: function (c) {
                return /\d{10}/.test(c) // test this
            }
        }
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        validate: {
            validator: function (em) {
                return /^\w+([\.-]?\w+)*@tufts.edu/.test(em)
            }
        },
        required: true,
        unique: true
    },
    hash : String, // Added for authentication purposes
    salt: String,
    signedWaiver: {
        type: Boolean,
        default: false
    },
    pronouns: {
        type: String,
        required: false,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    }
})

/***  AUTHENTICATION MIDDLEWARE (https://www.sitepoint.com/user-authentication-mean-stack/) ***/

//setPassword
playerSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}


//validatePassword
playerSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === hash;
}


//generateJWT: A JSON Web token
playerSchema.methods.generateJWT = function() {
    var expiry = new Date()
    expiry.setDate(expiry.getDate() + 2)


    return jwt.sign({
        _id: this._id,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000),
        admin: false
    }, process.env.JWT_SECRET)
}


const Player = mongoose.model('Player', playerSchema)
module.exports = Player


