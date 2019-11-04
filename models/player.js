var mongoose = require('mongoose')

var playerSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    name: {first: String, last: String},
    contact: {cell: String, email: String},
    teams: [
        {
            t_id: {type: mongoose.Schema.Types.ObjectId, ref: 'team'},
            waiver: Boolean,
            isCaptain: Boolean
        }
    ],
    created: Date
})

// var teamSchema = new mongoose.Schema({

// })

var Player = mongoose.model('Player', playerSchema);



module.exports = Player;

