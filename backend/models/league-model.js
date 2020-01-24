/* 
Database schema for league
Notes:
    - Added sport field. Update enum values to add more sports.
*/

var leagueSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true, 
        minlength: 1, 
        maxlength: 20
    },
    sport: {
        type: String,
        enum: ['Basketball', 'Soccer', 'Tennis', 'Other'],
        default: 'Other'
    },
    season: {
        type: String, 
        required: true
    },
    dates: {
        reg_start: Date,
        reg_end: Date,
        start_date: Date,
        end_date: Date
    },
    team_info: {
        num_teams: { type: Number, required: true },
        max_num_teams: { type: Number, required: true },
        max_team_size: { type: Number, required: true}
    },
    schedule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }],
    created: {
        type: Date, 
        default: Date.now
    }
})


var League = mongoose.model('League', leagueSchema);
module.exports = League;