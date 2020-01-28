/* 
Mongoose schema for Player. Exports Player model
Notes: 
    - Test cell-phone validator function
    - Added reference field for team
*/

var mongoose = require('mongoose')
require('mongoose-type-email');

/* Entries for Player:
    - _id: ObjectId
    - first: String
    - last: String
    - cell: String
    - email: Email
    - signedWaiver: Boolean
    - team: ObjectId ('Team' reference)
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
        default: '',
        validate: {
            validator: function(c) {
                return /\d{10}/.test(c); // test this
            }
        }
    },
    email: {
        type: mongoose.SchemaTypes.Email, 
        required: true
    },
    signedWaiver: {
        type: Boolean,
        default: false
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        default: undefined
    },
    created: {
        type: Date, 
        default: Date.now
    }
})

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;


