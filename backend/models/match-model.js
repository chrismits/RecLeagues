/* 
Database schema for match
Notes:
    - Changed score representation to have home and away scores as sub-fields.
    - Added sport field. Update enum values to add more sports.
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
    sport: {
        type: String,
        enum: ['Basketball', 'Soccer', 'Tennis', 'Other'],
        default: 'Other'
    },
    created: {
        type: Date, 
        default: Date.now
    }
})

var Match = mongoose.model('Match', matchSchema);
module.exports = Match;