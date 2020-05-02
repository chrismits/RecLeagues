/* team.js
- Contains all API routes of Team
*/

/******************** Configuration ***************************/ 
const express = require('express')
const router = express.Router()
var mongoose = require('mongoose')

var Player = require('../models/player-model.js')
var Team = require('../models/team-model.js')
var League = require('../models/team-model.js')

require('dotenv').config() // Developer Mode: Remove when done

/****************** Helpers and Middleware *******************/ 
var jwt = require('express-jwt')
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})

router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"message" : err.name + ": " + err.message})
    }
})

function handleError (e, obj, res) {
    if (e) {
        res.status(400).json(e)
    } else {
        res.status(200).json(obj)
    }
}

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

// Add email authentication
function send_email_registration(emails) {
    console.log("B : Send emails to registration")
    console.log(emails)
}

/********************** Routes ******************************/ 

/* createTeam
    Note: * Assumes that req.body is a Team frontend object.
          * req.body has a league field that is a League db ObjectId.
           - Checks if league exists
           - Checks if captain exists
           - Checks if team name is unique in league
         If all of the above pass, returns the id of the newly created team
         Otherwise returns an appropriate error message (Status Code: 400)
*/
router.post('/', auth, function (req, res) {
    console.log('B : Creating team')

    if (!req.payload._id || !req.payload.email) {
        console.log("Update player. unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    } else {
        if (req.body.captain.id === "1" || !req.body.captain.id) {
            req.body.captain.id = req.payload._id
        }

        if (req.payload._id !== req.body.captain.id) {
            return res.status(401).json({
                "message" : "UnauthorizedError: Private Information. Login id does not match captain id"
            })
        }

        saveTeam(req, res)
    }
})

/* getTeamsByLeagueID:
Request needs to have a single parameter: league
req.body.league: the id of the league to be searched
-- Returns an array of Teams.

-- No auth, public info
*/
router.get('/league/:league_id', auth, function (req, res) {
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
*/
router.get('/team/:team_id', auth,  function (req, res) {
    if (!req.payload._id || !req.payload.email) {
        console.log("Update player. unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }

    console.log('B: Getting team by team id ' + req.params.team_id)
    Team.findById(req.params.team_id)
        .populate('captain')
        .populate('players')
        .exec(function (err, tm) {
            if (err || !tm) { return handleError('Error: Could not find team', null, res) } else {
                return res.status(200).json(tm)
            }
        })
})

router.put('/api/teams/', auth, function (req, res) {
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

//deleteTeam



module.exports = router