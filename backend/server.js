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

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, 
                                            useUnifiedTopology: true,
                                            useFindAndModify: false}, 
                                                            function (err) {
    if (err) {
      console.log(err)
      process.exit(1)
    }
});

// Make sure to reuse connection pool
var db = mongoose.connection
console.log("DB Connected")

/****************** Player API *******************/
var Player = require('./models/player-model.js')

// 
/**** addPlayer
TESTED
*/
app.post('/api/players', function(req, res) {
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
app.delete('/api/players/:player_id', function(req, res) {
    Player.remove({_id: req.params.player_id}, function(err, player) {
        if (err)
            res.send(err)
    });
});

/**** getPlayers
- Returns all player documents in db. Will probably not be needed in prod
****/
app.get('/api/players', function(req, res) {
    console.log("Getting all players")
    Player.find(function(err, players) {
        if (err)
            res.send(err)

        res.json(players) // return all players in JSON format
    });
});

/****************** Team API *******************/
var Team = require('./models/team-model.js');

// createTeam
app.post('/api/teams/', function(req, res) {
    //check if team name already in use by league.
    console.log("B : Creating team")

    var curr_team = new Team();

    curr_team.name = req.body.name;
    curr_team.size = req.body.size;
    curr_team.captain = req.body.captain; // ideally, need id only
    curr_team.players.push(curr_team.captain); // ideally, need id only

    curr_team.save(function (err, team) {
        if (err) {
            res.send(err);
        }
        res.json(team);
    })
});

// addPlayertoTeam

// getTeams

// getTeambyName

// getTeambyPlayer

// getTeambyCaptain

/****************** League API *******************/

var League = require('./models/league-model.js')

// joinLeague

// addMatchesToLeague


/****  createLeague
 * Adds league to db. Intended for admin registration,
 * where team_info is unknown 
 */
app.post('/api/leagues/', function(req, res) {
    /* No league exists with same name
        FUTURE: - Check for leagues in db with coinciding 
        timeslots.
    */
    console.log("Backend: createLeague running")
    console.log(req.body)

    League.countDocuments({name: req.body.name}, function(err, count) {
        if (count > 0) {
            return res.status(400).send("Error: League name already in use")
        }
        var new_lg = new League({
            name: req.body.name,
            is_pickup: req.body.is_pickup,
            sport: req.body.sport,
            season: req.body.season,
            dates: {
                reg_start: req.body.reg_start,
                reg_end: req.body.reg_end,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                time_slots: req.body.time_slots
            },
            team_info: {
                num_teams: req.body.num_teams,
                max_num_teams: req.body.max_num_teams,
                min_team_size: req.body.min_team_size,
                auto_approval: req.body.auto_approval,
                teams: req.body.teams
            },
            league_type: req.body.league_type,
            competition_level: req.body.competition_level,
            free_agents: req.body.free_agents,
            matches: {
                location: req.body.location,
                game_length: req.body.game_length,
                schedule: req.body.schedule
            },
            rules: req.body.rules
        });
    
        new_lg.save(function(err, lg) {
            if (err) {
                res.send(err)
            }
            res.json(lg._id)
        });
    })
});


/* getLeagues
- Returns all league documents in db
{"dates": {"end_date": {$gte: curr_date}}}
*/
app.get('/api/leagues/', function(req, res) {
    console.log("Backend: Get Leagues")
    var curr_date = new Date();
    // console.log(curr_date)
    League.find(function(err, leagues) {
        if (err)
            res.send(err)

        res.json(leagues) // return all leagues in JSON format
    });
});

/* updateLeague
- Updates database entry by id.
*/
app.put('/api/leagues/', function(req, res) {
    console.log("BACKEND: Updating League");
    League.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err, lg) {
        if (err) {
            console.log(err) 
        }
    });
});

/****************** Match API *******************/


/****************** Other API *******************/



/***************** Server Setup ******************/

var server = app.listen(process.env.PORT, function () {
    console.log("Server running on port ", process.env.PORT)
})