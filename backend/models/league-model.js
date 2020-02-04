/* 
Database schema for league
Notes:
    - Added sport field. Update enum values to add more sports.
*/

var mongoose = require('mongoose');

/* Entries for League:
    - _id: ObjectId
    - name: String
    - sport: String
    - season: String
    - dates: All Date Objects
        - reg_start
        - reg_end
        - start_date
        - end_date
        - time_slots: [
            - day: String
            - length: Number
            - buffer: Number
            - start: String 
            - end: String
        ]
    - team_info: 
        - auto_approval: Boolean
        - num_teams: Number
        - max_num_teams: Number
        - max_team_size: Number
        - teams: Array ('Team' ref)
    - matches: Array ('Match' ref)
    - league_type: String
    - competitition_level: String
    - free_agents: Boolean
    - created: Date
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
        type: String
    },
    season: {
        type: String,
        enum: ['Fall', 'Winter', 'Spring'], 
        required: true
    },
    dates: {
        reg_start: Date,
        reg_end: Date,
        start_date: Date,
        end_date: Date,
        
        time_slots: [{
            day: String,
            length: Number,
            buffer: Number,
            start: String,
            end: String
        }]
    },
    team_info: {
        num_teams: { type: Number, required: true },
        max_num_teams: { type: Number, required: true },
        max_team_size: { type: Number, required: true },
        auto_approval: { type: Boolean, default: false },
        teams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }]
    },
    matches: [{
        // ADD LOCATION??
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }],
    league_type: {
        type: String,
        enum: ['Male', 'Female', 'Co-ed']
    },
    competition_level: {
        type: String,
        enum: ['Competitive', 'Recreational']
    },
    free_agents: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date, 
        default: Date.now
    }
})


var League = mongoose.model('League', leagueSchema);
module.exports = League;