// Set up and configure imports
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();

const cors = require('cors')

app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

require('dotenv').config();

const db_uri = process.env.DATABASE_URL
mongoose.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Connected to DB")
});


/************ Routing for server API ************/
var Player = require('./models/player-model.js')

// GET ALL PLAYERS
app.get('/api/players', function(req, res) {
    console.log("GETTING PLAYER")
    Player.find(function(err, players) {
        if (err)
            res.send(err)
        console.log("Found player")
        res.json(players) // return all players in JSON format
    });
});

// ADD PLAYER TO DB
/*
Next steps: - Check if id already in db so no duplicate players
            - Resolve: Cannot set header after they are sent to client
*/
app.post('/api/players', function(req, res) {
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


// REMOVE PLAYER FROM DB
app.delete('api/players/:player_id', function(req, res) {
    Player.remove({_id: req.params.player_id}, function(err, player) {
        if (err)
            res.send(err)
        
        // No error, return all players
        Player.find(function(error, players){
            if (error)
                res.send(error)
            res.json(players)
        });
    });
});

app.listen(4000, () => {
    console.log(`Starting the server at port ${4000}`);
});