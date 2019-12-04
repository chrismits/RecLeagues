/* 
Database schema for match
Fixes:
    - Custom validator for scoring: Figure out ideal representation.
*/

var matchSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    date: {type: Date, required: true},
    home: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
    away: {type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true},
    score: {type: String, required: false},
    created: {type: Date, default: Date.now}
})

var Match = mongoose.model('Match', matchSchema);
module.exports = Match;