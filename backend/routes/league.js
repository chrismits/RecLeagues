/* league.js
- Contains all API routes of League
*/

/******************** Configuration ***************************/ 
const express = require('express')
const router = express.Router()
var mongoose = require('mongoose')
require('dotenv').config() // developer mode

var League = require('../models/league-model.js')
var Team = require('../models/team-model.js')

router.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"message" : err.name + ": " + err.message})
    }
})

var jwt = require('express-jwt')
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})

/********************** Helpers ******************************/ 
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

function handleError (e, obj, res) {
    if (e) {
        res.status(400).json(e)
    } else {
        res.status(200).json(obj)
    }
}


/********************** Routes ******************************/ 

/* CreateLeague
    - Admin only.
*/
router.post('/', auth, function (req, res) {
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
router.get('/', auth, function (req, res) {
    if (!req.payload._id || !req.payload.email) {
        console.log("Get leagues. unauthorized")
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
router.put('/', auth, function (req, res) {
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

    console.log("B: Updating League")

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
router.get('/league/:league_id', auth, function(req, res) {
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
deleteLeague
*/
router.delete('/', auth, function (req, res) {
    console.log("deleting league")
    if (!req.payload._id || !req.payload.email) {
        console.log("Error: Unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Login to access"
        })
    }

    if (req.payload.admin === false || !req.payload.admin) {
        console.log("Admin only")
        return res.status(401).json({
            "message" : "UnauthorizedError: Admin only"
        })

    }

    League.deleteOne({ _id: req.body.id }, function (err) {
        if (err) 
            return handleError(err, null, res)
        else
            console.log("deleted")
    })
})

module.exports = router