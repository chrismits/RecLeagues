/*
Database schema for league
Notes:
    - Added sport field. Update enum values to add more sports.
    - CHANGE TO MIN NUMBER OF TEAMS.
*/

var mongoose = require('mongoose');

/* Entries for League:
    - _id: ObjectId
    - name: String
    - is_pickup: Boolean
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
        - min_team_size: Number
        - teams: Array ('Team' ref)
    - matches:
        - location: String
        - game_length: Number
        - schedule: Array ('Match' ref)
    - league_type: String
    - competitition_level: String
    - free_agents: Boolean
    - rules: String
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
        maxlength: 30
    },
    is_pickup: {
        type: Boolean,
        default: false
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
        num_teams: {type: Number, required: true},
        max_num_teams: {type: Number, required: true},
        min_team_size: {type: Number, required: true},
        auto_approval: {type: Boolean, default: false},
        teams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }]
    },

    matches: { // schedule in league frontend
        location: String,
        game_length: Number,
        schedule: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Match'
        }]
    },
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
    rules: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});


var League = mongoose.model('League', leagueSchema);
module.exports = League;