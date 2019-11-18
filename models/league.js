/* 
Database schema for league
Fixes: 
    - Add validation for registration start and end date
    - Restructure validation/names for current teams,
*/

var leagueSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: {type: String, required: true, minlength:1, maxlength:20},
    sport: {type: String, required: true},
    season: {type: String, required: true},
    dates: {
        reg_start: Date,
        reg_end: Date,
        start: Date
    },
    num_teams: {type: Number, required: true},
    max_num_teams: {type: Number, required: true},
    max_team_size: {type: Number, required: true},
    schedule: [{type: mongoose.Schema.Types.ObjectId, ref: 'Match'}],
    created: {type: Date, default: Date.now}
})

var League = mongoose.model('League', leagueSchema);
module.exports = League;

