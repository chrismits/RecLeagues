/* 
Database schema for Team
Notes: 
    - Does captain requires a validation function?
    - Add entry for picture of logo. Store as buffer or link to object store.

*/

var teamSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String, 
        required: true, 
        minlength: 1, 
        maxlength: 30
    },
    size: {
        type: Number, 
        required: true, 
        validate: {
            validator: function(v) {
                return v >= 1 && v < 30
            },
            message: 'Team size should be 1 - 30 players'
        }
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', 
        default: undefined,
    },
    players: [{ // Array of players
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Player'
    }],
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League'
    },
    created: {
        type: Date, 
        default: Date.now
    }
})


var Team = mongoose.model('Team', teamSchema);
module.exports = Team;