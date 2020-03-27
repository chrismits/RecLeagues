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

/** **************** Player API *******************/

/** ** addPlayer
TESTED
*/
app.post('/api/players', function (req, res) {
    // Check if player already exists in db.
    Player.countDocuments({ email: req.body._email }, function (err, count) {
        if (err) {
            return handleError('Error: Unexpected result in post player', null, res)
        }
        if (count > 0) {
            return handleError('Error: Email already in use', null, res)
        }

        var new_player = new Player()

        new_player.first = req.body._first
        new_player.last = req.body._last
        new_player.email = req.body._email

        if (req.body._cell !== null) { new_player.cell = req.body._cell }

        new_player.save(function (err2, player) {
            if (err2) { return handleError('Error: Player does not abide by schema', null, res) }
            handleError(null, player, res)
        })
    })
})

/** ** deletePlayer: For now does nothing, might be needed later
****/
app.delete('/api/players/:player_id', function (req, res) {
    // Player.remove({_id: req.params.player_id}, function(err, player) {
    //     if (err)
    //         handleError("Error: Could not delete player")
    // });
})


/** ** getPlayers
- Returns all player documents in db. Will probably not be needed in prod
****/

app.get('/api/players', function (req, res) {
    console.log('Getting all players')
    Player.find(function (err, players) {
        if (err || (players.length === 0)) { return handleError('Error: Could not find players in db', null, res) }

        res.json(players) // return all players in JSON format
    })
})


/** *  getPlayer
 - Returns a single player from db.
 -  Expects email as an http param -> req.query.email
*/

app.get('/api/players', function (req, res) {
    Player.findOne({ email: req.query.email }, function (err, pl) {
        if (err || !pl) { return handleError('Error: Could not find player', null, res) }
        res.status(200).json(pl)
    })
})

/*****************************************************************************/



/** **************** Team API *******************/

// helper function for createTeam
function saveTeam (req, res) {
    // check if captain exists
    Player.findById(req.body.captain, function (err, pl) {
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
                            return handleError('Error: Team could not be saved', null, res)
                        } else {
                            res.status(200).json(team)
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
            return saveTeam(req, res)
        }
    })
})


// update Team:
app.put('/api/teams/', function (req, res) {
    console.log('B : Updating team')

    Team.findById(req.body._id, function (err, tm) {
        if (err) { return handleError('Error: Team could not be updated as it does not exist', null, res) } else {
            // update simple fields
            tm.approved = req.body.approved
            tm.size = req.body.size
            tm.free_agents = req.body.free_agents
            tm.record.wins = req.body.record.wins
            tm.record.ties = req.body.record.ties
            tm.record.losses = req.body.record.losses

            // add player to league.
            tm.players = []
            for (var i = 0; i < req.body.players.length; i++) {
                tm.players.push(req.body.players[i]._id)
            }

            // finally validate through schema and save
            tm.save(function (err, new_team) {
                if (err) { return handleError('Error: Team update not possible', null, res) } else { res.status(200).json(new_team._id) }
            })
        }
    })
})

/* getTeamsByLeagueID:
Request needs to have a single parameter: league
req.body.league: the id of the league to be searched
-- Returns an array of Teams.
*/
app.get('/api/teams/', function (req, res) {
    console.log('B : Getting team')

    console.log(req.query.league)

    Team.find({ league: { $eq: req.query.league } })
        .populate('players')
        .populate('captain')
        .exec(function (err, tms) {
            if (err) { return handleError(err, null, res) } else { res.status(200).json(tms) }
    })
})


/* getTeam returns team by id */
app.get('/api/team', function (req, res) {
    console.log('B: Getting team by id')
    Team.findById(req.body._id)
        .populate('captain')
        .populate('players')
        .exec(function (err, tm) {
            if (err || !tm) { return handleError('Error: Could not find team', null, res) } else {
                return res.status(200).json(tm)
            }
        })
})

/*****************************************************************************/

// ADD AUTHENTICATION FOR EMAIL!!!


/** **************** League API *******************/

/** **  createLeague
 * Adds league to db. Intended for admin registration,
 * where team_info is unknown
 */
app.post('/api/leagues/', function (req, res) {
    /* No league exists with same name
        FUTURE: - Check for leagues in db with coinciding
        timeslots.
    */
    console.log('B: createLeague running')

    League.countDocuments({ name: req.body.name }, function (err, count) {
        if (err) {
            return handleError('Error: Unexpected result in post league', null, res)
        }
        if (count > 0) {
            return res.status(400).send('Error: League name already in use')
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
                teams: req.body.teams // empty because no registration yet
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
        })

        new_lg.save(function (err, lg) {
            if (err) {
                res.send(err)
            }
            res.json(lg._id)
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
    League.findById(req.body._id, function (err, lg) {
        if (err || !lg) { return handleError(err, null, res) }

        // time slot added
        if (req.body.time_slots && req.body.time_slots.length !== 0) {
            lg.dates.time_slots = req.body.time_slots
        }

        // num teams and teams update
        lg.team_info.num_teams = req.body.num_teams

        if (req.body.teams) {
            lg.team_info.teams = []
            for (var i = 0; i < req.body.teams.length; i++) {
                lg.team_info.teams.push(req.body.teams[i]._id)
            }
        }

        if (req.body.schedule) {
            // matches changed
            if (req.body.schedule.length !== lg.matches.schedule.length) {
                lg.matches.schedule = req.body.schedule.map(elem => elem._id)
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


/*****************************************************************************/

/** **************** Match API *******************/

/** **************** Other API *******************/

/** *************** Server Setup ******************/

app.listen(process.env.PORT, function () {
    console.log('Server running on port ', process.env.PORT)
})
