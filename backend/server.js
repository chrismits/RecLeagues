var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var app = express()
var cors = require('cors')
require('dotenv').config() // Developer Mode: Remove when done

app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

var League = require('./models/league-model.js')
var Player = require('./models/player-model.js')
var Team = require('./models/team-model.js');


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



/*****************************************************************************/



/****************** Player API *******************/
 
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

/*****************************************************************************/




/****************** Team API *******************/
/* createTeam
    Note: * Assumes that req.body is a Team frontend object.
          * req.body has a league field that is a League db ObjectId.

           - Checks if league exists
           - Checks if captain exists
           - Checks if team name is unique in league
         If all of the above pass, returns the id of the newly created team
         Otherwise returns an appropriate error message (Status Code: 400)

*/

//helper function for createTeam
function saveTeam(req, res) {
    //check if captain exists
    Player.findById(req.body.captain, function(err, pl) {
        if (err) {
            return handleError("Error: Captain does not exist", null, res)
        }
        else {
            Team.find({league: req.body.league}).select('name').exec(function(err, teams) {
                if (err) {
                    return handleError("Error: League not found", null, res)
                }
                else {
                    for (var i = 0; i < teams.length; i++) {
                        if (teams[i].name == req.body.name) {
                            return handleError("Error: Team name already exists in league", null, res)
                        }
                    }
                    var curr_team = new Team({
                        name: req.body.name,
                        size: req.body.size,
                        captain: req.body.captain,
                        players: [req.body.captain],
                        league: req.body.league,
                        record: {
                            wins: 0,
                            ties: 0,
                            losses: 0
                        },
                        approved: req.body.approved
                    })        
                    curr_team.save(function (err, team) {
                        if (err) {
                            return handleError("Error: Team could not be saved", null, res)
                        }
                        else {
                            return handleError(null, team._id, res)
                        }
                    })
                }
            })
        }
    })
}

//helper func
function handleError(e, obj, res) {
    if (e) {
        res.status(400).json(e)
    }
    else {
        res.status(200).json(obj._id)
    }
}

app.post('/api/teams/', function(req, res) {
    console.log("B : Creating team")

    League.findById(req.body.league, function(err, lg) {
        if (err || !lg) {
            return handleError("Error: League does not exist", null, res)
        }
        else {
            return saveTeam(req, res)
        }
    })
});


// update Team: 
app.put('api/teams/', function(req, res) {
    console.log("B : Updating team NOT WORKING YET")

    // approval change

    // players change

    // record change

})

// get Teams by league id
app.get('api/teams/', function(req, res) {
    console.log("B : Getting team");
    
    Team.find({"league": {$eq: req.body._id}}, function(err, leagues) {
        if (err) {
            console.log(err + " Could not find teams for specified league id")
        }

        res.json(leagues);
    }) // assumes that team has league ref. 
})






/*****************************************************************************/







/****************** League API *******************/
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
*/
app.get('/api/leagues/', function(req, res) {
    console.log("Backend: Get Leagues")
    var curr_date = new Date();
    curr_date.setHours(0, 0, 0, 0);

    // Find all leagues that are currently active.
    League.find({"dates.end_date": {$gt: curr_date}}, function(err, leagues) {
        if (err){
            res.send(err)
        }

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


/*****************************************************************************/




/****************** Match API *******************/


/****************** Other API *******************/


/***************** Server Setup ******************/

var server = app.listen(process.env.PORT, function () {
    console.log("Server running on port ", process.env.PORT)
})