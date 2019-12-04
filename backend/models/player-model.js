/* 
Database schema for player
Fixes: 
    - Validation
*/

var mongoose = require('mongoose')
require('mongoose-type-email');

var playerSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    first: {type: String, required: true, minlength:1},
    last: {type: String, required: true, minlength:1},
    cell: {type: String, required: false, default: undefined},
    email: {type: mongoose.SchemaTypes.Email, required: true},
    waiver: {type: Boolean, default: false},
    created: {type: Date, default: Date.now}
})

var Player = mongoose.model('Player', playerSchema);
module.exports = Player;


