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
TESTED
*/
app.post('/api/Player/players', function(req, res) {
    // Check if player already exists in db.
    var new_player = new Player()
    Player.countDocuments({ email: req.body._email}, function(err, count) {
        if (count > 0) {
            res.status(400).send("Error: Email already in use")
        }
    })

    new_player.first = req.body._first
    new_player.last = req.body._last
    new_player.email = req.body._email
    if (req.body._cell !== null)
        new_player.cell = req.body._cell

    new_player.save(function (err, player) {
        if (err)
            res.send(err) // change for PROD 
        res.json(player)    
    })
});

/**** deletePlayer 
- NOT TESTED
****/
app.delete('api/Player/players/:player_id', function(req, res) {
    Player.remove({_id: req.params.player_id}, function(err, player) {
        if (err)
            res.send(err)
    });
});

/**** getPlayers
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

// createTeam

// addPlayertoTeam

// getTeams

// getTeambyName

// getTeambyPlayer

// getTeambyCaptain

/****************** League API *******************/

// joinLeague

// addMatchesToLeague



/****************** Match API *******************/


/****************** Other API *******************/
