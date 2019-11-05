require('mongoose-type-email');

var playerSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    first: {type: String, required: true},
    last: {type: String, required: true},
    cell: {type: String, required: false},
    email: {type: mongoose.SchemaTypes.Email, required: true},
    teams: {type: [
        {
            t_id: {type: mongoose.Schema.Types.ObjectId, ref: 'team'},
            waiver: Boolean,
            isCaptain: Boolean
        }
    ], required: false, default: undefined},
    created: {type: Date, default: Date.now}
})

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;

