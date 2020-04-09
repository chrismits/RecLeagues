var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var app = express()
var cors = require('cors')
require('dotenv').config() // Developer Mode: Remove when done

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// import database models
var League = require('./models/league-model.js')
var Player = require('./models/player-model.js')
var Team = require('./models/team-model.js')
var Match = require('./models/match-model.js')


/** ************ Database Setup *******************/


mongoose.connect(process.env.DATABASE_URL, {
                                            useNewUrlParser: true,
                                            useUnifiedTopology: true,
                                            useFindAndModify: false
                                            },
                                            function (err) {
                                                if (err) {
                                                    console.log(err)
                                                    process.exit(1)
                                                }
})

// Make sure to reuse connection pool
// var db = mongoose.connection
console.log('DB Connected')


/*****************************************************************************/


// helper func
function handleError (e, obj, res) {
    if (e) {
        res.status(400).json(e)
} else {
        res.status(200).json(obj._id)
}
}

/****************** Player API *******************/

/** addPlayer
Backend: Tested
ApiService: Tested
Frontend Service: Tested -> user.service.ts
*/
app.post('/api/players', function (req, res) {
    console.log("B: Adding Player")
    // Check if player already exists in db.
    Player.countDocuments({ email: req.body.email }, function (err, count) {
        if (err) {
            return handleError('Error: Unexpected result in post player', null, res)
        }
        if (count > 0) {
            return handleError('Error: Email already in use', null, res)
        }

        var new_player = new Player()

        new_player.first = req.body.first
        new_player.last = req.body.last
        new_player.email = req.body.email

        if (req.body.cell !== null) { 
            new_player.cell = req.body.cell
        }

        new_player.save(function (err2, player) {
            if (err2) {
                return handleError('Error: Player does not abide by schema', null, res) 
            }

            res.status(200).json(player)
        })
    })
})

/***  getPlayerByEmail
 - Returns a single player from db.
 -  Expects email as an http param -> req.query.email
 Backend: Tested
 ApiService: Tested
 Frontend Service: Tested
*/

app.get('/api/players/:email', function (req, res) {
    console.log("B: Getting Player by Email")
    Player.findOne({ email: req.params.email }, function (err, pl) {
        if (err || !pl) {
            return handleError('Error: Could not find player', null, res)
        }
        else {
            res.status(200).json(pl)
        }
    })
})

/* Update Player
 Backend: Tested
 ApiService: Tested
 Frontend Service: Tested
*/
app.put('/api/players', function (req, res) {
    console.log('B: Updating Player')

    Player.findById(req.body.id, function(err, pl) {
        if (err || !pl) {
            return handleError("Error: Player not found in db, cannot update",
            null, res)
        }

        // update fields
        pl.first = req.body.first
        pl.last = req.body.last
        pl.cell = req.body.cell
        pl.email = req.body.email
        pl.signedWaiver = req.body.waiver
        pl.pronouns = req.body.pronouns

        // add something to handle logo???

        pl.save(function(err, player) {
            if (err) {
                handleError("Error: Could not update player, does not abide by schema", null, res)
            }
            else {
                res.status(200).json(player)
            }
        })
    })
})


/** ** getPlayers
- Returns all player documents in db
Backend: 
ApiService: 
Frontend Service: 
****/
app.get('/api/players', function (req, res) {
    console.log('B: Getting All Players')
    Player.find(function (err, players) {
        if (err || (players.length === 0)) { 
            return handleError('Error: Could not find players in db', null, res) 
        }

        console.log(players.length)
        res.json(players) // return all players in JSON format
    })
})


/**** deletePlayer: For now does nothing, might be needed later
Backend: Tested
ApiService:
Frontend Service:
****/
// app.delete('/api/players/:email', function (req, res) {
//     Player.deleteOne({_id: req.params.player_id}, function(err, player) {
//         if (err)
//             handleError("Error: Could not delete player")
//     });
// })


/*****************************************************************************/

/******************* League API *********************/

/** **  createLeague
 * Adds league to db. Intended for admin registration.
 Backend: Tested
 ApiService: Tested
 Frontend Service: Tested
 */
app.post('/api/leagues/', function (req, res) {
    console.log('B: createLeague running')

    League.countDocuments({ name: req.body.name }, function (err, count) {
        if (err) {
            return handleError('Error: Unexpected result in post league', null, res)
        }
        if (count > 0) {
            return handleError('Error: League name already in use', null, res)
        }

        var new_lg = new League({
            name: req.body.name,
            sport: req.body.sport,
            season: req.body.season,
            dates: {
                reg_start: req.body.regStart,
                reg_end: req.body.regEnd,
                start_date: req.body.startDate,
                end_date: req.body.endDate,
                time_slots: req.body.timeSlots
            },
            team_info: {
                num_teams: req.body.numTeams,
                max_num_teams: req.body.maxNumTeams,
                min_team_size: req.body.minTeamSize,
                auto_approval: req.body.autoApproval,
                players_on: req.body.playersOn,
                teams: req.body.teams 
            },
            league_type: req.body.leagueType,
            competition_level: req.body.competitionLevel,
            free_agents: req.body.freeAgents,
            matches: {
                location: req.body.location,
                game_length: req.body.gameLength,
                schedule: req.body.schedule
            },
            rules: req.body.rules
        })

        new_lg.save(function (err, lg) {
            if (err) {
                console.log(err)
                res.send(err)
            }
            res.json(lg)
        })
    })
})


/* getLeagues
- Returns all league documents in db whose end date is less than current date
*/
// get leagues (also populate references)
app.get('/api/leagues/', function (req, res) {
    console.log('B: Get Leagues')
    var curr_date = new Date()
    curr_date.setHours(0, 0, 0, 0)

    League.find({ 'dates.end_date': { $gt: curr_date } })
          .populate({
                    path: 'team_info.teams',
                    populate: 'captain players'
                    })
          .populate({
                    path: 'matches.schedule',
                    populate: 'home away'
            })
          .exec(function (err, leagues) {
              if (err || !leagues) { 
                return handleError(err, null, res)
            }

            res.status(200).json(leagues)
          })
})

/* updateLeague
    Test update with:
        - new time slot
        - new team --> see if map works
*/
app.put('/api/leagues/', function (req, res) {
    League.findById(req.body.id, function (err, lg) {
        // League does not exist/id has not been updated.
        if (err || !lg) { 
            return handleError(err, null, res) 
        }

        // time slots:
        if (req.body.timeSlots && req.body.timeSlots.length !== lg.dates.time_slots.length) {
            lg.dates.time_slots = []

            //populate time slots
            for (var i = 0; i < req.body.timeSlots.length; i++) {
                var new_slot = {day: req.body.timeSlots[i].day,
                                length: req.body.timeSlots[i].length,
                                buffer: req.body.timeSlots[i].buffer,
                                start: req.body.timeSlots[i].start,
                                end: req.body.timeSlots[i].end}
                lg.dates.time_slots.push(new_slot)
            }
        }

        // num teams and teams update
        lg.team_info.num_teams = req.body.numTeams

        if (req.body.teams) {
            lg.team_info.teams = []
            for (var i = 0; i < req.body.teams.length; i++) {
                lg.team_info.teams.push(req.body.teams[i].id)
            }
        }

        if (req.body.schedule) {
            // matches changed
            if (req.body.schedule.length !== lg.matches.schedule.length) {
                lg.matches.schedule = req.body.schedule.map(elem => elem.id)
            }
        }

        // rules changed
        lg.rules = req.body.rules

        lg.save(function (err, lg) {
            if (err || !lg) { return handleError(err, null, res) }
            res.status(200).json(lg)
        })
    })
})

/*
delete league
*/
app.delete('/api/leagues', function (req, res) {
    League.deleteOne({ _id: req.body._id }, function (err) {
        if (err) handleError(err, null, res)
    })
})


/****************** Team API *******************/

// helper function for createTeam
function saveTeam (req, res) {
    console.log("B: SAVING TEAM")
    // check if captain exists
    Player.findOne({email : req.body.captain.email}, function (err, pl) {
        if (err) {
            return handleError('Error: Captain does not exist', null, res)
        } else {
            Team.find({ league: req.body.league }).select('name').exec(function (err, teams) {
                if (err) {
                    return handleError('Error: League not found', null, res)
                } else {
                    for (var i = 0; i < teams.length; i++) {
                        if (teams[i].name === req.body.name) {
                            return handleError('Error: Team name already exists in league', null, res)
                        }
                    }
                    var curr_team = new Team({
                        name: req.body.name,
                        size: 1, // currently only captain
                        captain: pl._id,
                        players: [pl._id],
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
                            console.log(err)
                            return handleError('Error: Team could not be saved', null, res)
                        } else {
                            console.log("Team saved to db")
                            send_email_registration(req.body.emails)
                            populate_team(team, res)
                        }
                    })
                }
            })
        }
    })
}

/* createTeam
    Note: * Assumes that req.body is a Team frontend object.
          * req.body has a league field that is a League db ObjectId.
           - Checks if league exists
           - Checks if captain exists
           - Checks if team name is unique in league
         If all of the above pass, returns the id of the newly created team
         Otherwise returns an appropriate error message (Status Code: 400)
*/
app.post('/api/teams/', function (req, res) {
    console.log('B : Creating team')

    League.findById(req.body.league, function (err, lg) {
        if (err || !lg) {
            return handleError('Error: League does not exist', null, res)
        } else {
            saveTeam(req, res)
        }
    })
})

/* getTeamsByLeagueID:
Request needs to have a single parameter: league
req.body.league: the id of the league to be searched
-- Returns an array of Teams.
*/
app.get('/api/teams/:league_id', function (req, res) {
    console.log('B : Getting teams by league_id: ' + req.params.league_id)

    Team.find({ league: { $eq: req.params.league_id } })
        .populate('players')
        .populate('captain')
        .exec(function (err, teams) {
            if (err) { 
                return handleError(err, null, res) 
            } 
            else { 
                res.status(200).json(teams) 
            }
    })
})

/* getTeam returns team by id */
app.get('/api/team/:team_id', function (req, res) {
    console.log('B: Getting team by team id')
    Team.findById(req.params.team_id)
        .populate('captain')
        .populate('players')
        .exec(function (err, tm) {
            if (err || !tm) { return handleError('Error: Could not find team', null, res) } else {
                return res.status(200).json(tm)
            }
        })
})

// update Team PLAYERS TO ADD SHOULD ALL BE REGISTERED PLAYERS NOT FULLY OPERATIONAL YET
app.put('/api/teams/', function (req, res) {
    console.log('B : Updating team')

    Team.findById(req.body.id, function (err, tm) {
        if (err) { return handleError('Error: Team could not be updated as it does not exist', null, res) } else {
            // update simple fields
            tm.approved = req.body.approved
            tm.size = req.body.size
            tm.free_agents = req.body.freeAgents
            tm.record.wins = req.body.record.wins
            tm.record.ties = req.body.record.ties
            tm.record.losses = req.body.record.losses

            // add player to league.
            tm.players = []
            for (var i = 0; i < req.body.players.length; i++) {
                tm.players.push(req.body.players[i].id)
            }

            // finally validate through schema and save
            tm.save(function (err, new_team) {
                if (err) { return handleError('Error: Team update not possible', null, res) } else { res.status(200).json(new_team._id) }
            })
        }
    })
})

/*****************************************************************************/


/*****************************************************************************/

/** **************** Match API *******************/


/****************** Other API Functionality *******************/

function populate_team(team, res) {
    Team.findById(team._id)
        .populate({path: 'captain'})
        .populate({path: 'players'})
        .exec(function(err, populated_team) {
            if (err)
                return handleError("Error: Team could not be populated", null, res)
            else {
                res.status(200).json(populated_team)
            }
        })
}

// Add email authentication
function send_email_registration(emails) {
    console.log("B : Send emails to registration")
    console.log(emails)
}


/***************** Server Setup ******************/

app.listen(process.env.PORT, function () {
    console.log('Server running on port ', process.env.PORT)
})
