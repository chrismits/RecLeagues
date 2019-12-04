/* 
Database schema for Team
Fixes: 
    - Validation for captain?
    - Validation for league
    - Insert sport as a field?
*/

var teamSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: {type: String, required: true, minlength: 1, maxlength: 30},
    logo_loc: {type: String, required: false}, //Location of logo image in Object Store?
    size: {
        type: Number, 
        required: true, 
        validate: {
            validator: function(v) {
                return v >= 1
            },
            message: 'Team size should be at least 1'
        }
    },
    captain: {type: mongoose.Schema.Types.ObjectId, ref: 'Player', default: undefined},
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
    league: {type: mongoose.Schema.Types.ObjectId, ref: 'Leage'},
    created: {type: Date, default: Date.now}
})

var Team = mongoose.model('Team', teamSchema);
module.exports = Team;