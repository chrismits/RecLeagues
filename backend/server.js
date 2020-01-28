var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var app = express()
var cors = require('cors')
require('dotenv').config() // Developer Mode: Remove when done

app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

/************** Database Setup *******************/

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
      console.log(err)
      process.exit(1)
    }
});

// Make sure to reuse connection pool
var db = mongoose.connection
console.log("DB Connected")

/***************** Server Setup ******************/

var server = app.listen(process.env.PORT, function () {
    console.log("Server running on port ", process.env.PORT)
})



/****************** Player API *******************/
var Player = require('./models/player-model.js')

// 
/**** addPlayer
Next steps: - Check if id already in db so no duplicate players
            - Resolve: Cannot set header after they are sent to client
*/
app.post('/api/players', function(req, res) {

    // Check for duplicates






    Player.create({
        first: req.body._first,
        last: req.body._last,
        cell: req.body._cell,
        email: req.body._email,
        waiver: req.body.waiver
    }, 
    function(err, new_player) {
        if (err)
            res.send(err)
        // No error, return all players
        Player.find(function(error, players){
            if (error)
                res.send(error)
            res.json(players);
        })
    });

});

// getPlayerbyid -- GET

// updatePlayerbyid -- PUT 

/**** deletePlayer 
- NOT TESTED
****/
app.delete('api/Player/players/:player_id', function(req, res) {
    Player.remove({_id: req.params.player_id}, function(err, player) {
        if (err)
            res.send(err)
    });
});

/**** getAllPlayers
- Returns all player documents in db. Will probably not be needed in prod
****/
app.get('/api/Player/players', function(req, res) {
    console.log("Getting all players")
    Player.find(function(err, players) {
        if (err)
            res.send(err)

        res.json(players) // return all players in JSON format
    });
});

/****************** Team API *******************/


/****************** League API *******************/


/****************** Match API *******************/


/****************** Admin API *******************/