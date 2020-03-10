/*
Database schema for match
Notes:
    - Changed score representation to have home and away scores as sub-fields.
    - Added location field. Update enum values with all Tufts buildings
    - Keep track of the approved players for match
*/

var mongoose = require('mongoose')

/* Entries for Match:
    - _id: ObjectId
    - date: Date
    - location: String
    - home: ObjectId ('Team' ref)
    - away: ObjectId ('Team' ref)
    - score:
        - home_score: String
        - away_score: String
    - created: Date
*/
var matchSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    home: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    away: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    score: {
        home_score: String,
        away_score: String,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    }
})

var Match = mongoose.model('Match', matchSchema)
module.exports = Match
