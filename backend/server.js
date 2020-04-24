var express = require('express')
var mongoose = require('mongoose')

var path = require('path')
// var favicon = require('serve-favicon')
// var logger = require('morgan')
// var cookieParser = require('cookie-parser')
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
var Admin = require('./models/admin-model.js')


/************** Database Setup *******************/


mongoose.connect(process.env.DATABASE_URL, {
                                            useNewUrlParser: true,
                                            useUnifiedTopology: true,
                                            useFindAndModify: false,
                                            useCreateIndex: true
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

// Error Handling
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"message" : err.name + ": " + err.message})
    }
})

/********************* Authentication ***************************************/
var jwt = require('express-jwt')
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})

var authorizationRouter = require('./routes/auth.js')
app.use('/api/auth', authorizationRouter)

/************************** Player API *****************************************/
var playerRouter = require('./routes/player.js')
app.use('/api/players', playerRouter)


/*****************************************************************************/

/******************* League API *********************/

/** **  createLeague
 * Adds league to db. Intended for admin registration.
 Backend: Tested
 ApiService: Tested
 Frontend Service: Tested
 */
app.post('/api/leagues/', auth, function (req, res) {
    console.log('B: createLeague running')

    if (!req.payload._id || !req.payload.email) {
        console.log("Create league. unauthorized admin access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Admin Information. Login to access"
        })
    }

    if (!req.payload.admin) {
        console.log("Error: Not an Administrator")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Admin Information. Login to access"
        })
       
    }

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
                return handleError("Error: League could not be saved", null, res)
            }
            populatesend_league(lg, res)
        })
    })
})


/* getLeagues
- Returns all league documents in db whose end date is less than current date
*/
// get leagues (also populate references) -> NO AUTH FOR NOW, PUBLIC INFORMATION
app.get('/api/leagues/', auth, function (req, res) {
    if (!req.payload._id || !req.payload.email) {
        console.log("Get leagues. unauthorized admin")
        return res.status(401).json({
            "message" : "UnauthorizedError: Login to access"
        })
    }

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

/* updateLeague -> expects league id
    Test update with:
        - new time slot
        - new team --> see if map works
*/
app.put('/api/leagues/', auth, function (req, res) {
    if (!req.payload._id || !req.payload.email) {
        console.log("Update League. Unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }

    if (req.payload.admin === false) {
        console.log("Error: Needs Admin")
        return res.status(401).json({
            "message" : "UnauthorizedError: Needs Administrator Privileges"
        })
    }

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


        // NOTE  --> Probably not good to add matches in update. They should
        // be done in match.
        // if (req.body.schedule) {
        //     // matches changed
        //     if (req.body.schedule.length !== lg.matches.schedule.length) {
        //         lg.matches.schedule = req.body.schedule.map(elem => elem.id)
        //     }
        // }

        // rules changed
        lg.rules = req.body.rules

        lg.save(function (err, lg) {
            if (err || !lg) { return handleError(err, null, res) }
            populatesend_league(lg, res)
        })
    })
})

// adding auth for testing
/*
Get League by league id
*/
app.get('/api/league/:league_id',  function(req, res) {
    console.log("B: Getting league by id")

    if (!req.payload._id || !req.payload.email) {
        console.log("Error: Unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Login to access"
        })

    }

    League.findById(req.params.league_id)
          .populate({
                path: 'team_info.teams',
                populate: 'captain players'
            })
          .populate({
                path: 'matches.schedule',
                populate: 'home away'
            })
          .exec(function (err, league) {
            if (err) { 
                return handleError(err, null, res)
            }
            res.status(200).json(league)
           })
})

/*
delete league: FIIIIIIX
*/
// app.delete('/api/leagues', function (req, res) {
//     League.deleteOne({ _id: req.body._id }, function (err) {
//         if (err) handleError(err, null, res)
//     })
// })


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
                            populatesend_team(team, res)
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
app.post('/api/teams/', auth, function (req, res) {
    console.log('B : Creating team')

    if (!req.payload._id || !req.payload.email) {
        console.log("Update player. unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }

    console.log(req.payload._id)
    console.log(req.body.captain.id)

    if (req.payload._id !== req.body.captain.id) {
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login id does not match captain id"
        })
    }

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

-- No auth, public info
*/
app.get('/api/teams/:league_id', auth, function (req, res) {
    if (!req.payload._id || !req.payload.email) {
        console.log("Update player. unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }
    
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

/* getTeam returns team by id 
  - No auth, public info*/
app.get('/api/team/:team_id', function (req, res) {
    if (!req.payload._id || !req.payload.email) {
        console.log("Update player. unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }

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
app.put('/api/teams/', auth, function (req, res) {
    console.log('B : Updating team')

    if (!req.payload._id || !req.payload.email) {
        console.log("Update Team. unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Player Information. Login to access"
        })
    }


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
                if (err) { 
                    return handleError('Error: Team update not possible', null, res) 
                } 
                else { 
                    populatesend_team(new_team, res)
                }
            })
        }
    })
})

/*****************************************************************************/


/*****************************************************************************/

/** **************** Match API *******************/

/* addMatch
req.body contains home and away teams
*/

app.post('/api/matches/', auth, function(req, res) {
    console.log("B: Creating match")

    if (!req.payload._id || !req.payload.email) {
        console.log("Adding match: unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }

    if (!req.payload.admin) {
        return res.status(401).json({
            "message" : "UnauthorizedError: Needs Administrator Privileges"
        })
    }



    if (req.body.home.league != req.body.away.league) {
        return handleError("Error: Teams are not in the same league", null, res)
    }
    else {
        // create match
        var new_match = new Match({date: req.body.date, 
                                   location: req.body.location,
                                   home: req.body.home,
                                   away: req.body.away})

        new_match.save(function(err, match) {
            if (err) {
                return handleError("Error: Match could not be saved", null, res)
            }
            League.findByIdAndUpdate(req.body.home.league, 
                {"$push": {"matches.schedule": mongoose.Types.ObjectId(req.body.home.league)}}, function(error, league) {
                    if (error) {
                        return handleError("Find and Update did not work", null, res)
                    }

                    populatesend_match(match, res)
                })
        })
    }
})


/****************** Other API Functionality *******************/
function populatesend_match(match, res) {
    Match.findById(match.id)
         .populate({path: 'home'})
         .populatee({path: 'away'})
         .exec(function(err, populated_match) {
             if (err) {
                return handleError("Error: Populating Match failed...", null, res)
             }
             res.status(200).json(populated_match)
         })
}
function populatesend_team(team, res) {
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

function populatesend_league(league, res) {
    League.findById(league._id)
          .populate({
                path: 'team_info.teams',
                populate: 'captain players'
           })
          .populate({
                path: 'matches.schedule',
                populate: 'home away'
            })
          .exec(function(err, populated_league) {
              if (err)
                return handleError("Error: League could not be populated", null, res)
              else
                res.status(200).json(populated_league)
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
