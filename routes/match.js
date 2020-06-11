/* match.js
- Contains all API routes of Match
*/

/******************** Configuration ***************************/ 
const express = require('express')
const router = express.Router()
var mongoose = require('mongoose')
require('dotenv').config() // developer mode

var League = require('../models/league-model.js')
var Team = require('../models/team-model.js')
var Match = require('../models/match-model.js')

/******************** Helpers ***************************/ 

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

function populatesend_match(match, res) {
    Match.findById(match.id)
         .populate({path: 'home'})
         .populate({path: 'away'})
         .exec(function(err, populated_match) {
             if (err) {
                return handleError("Error: Populating Match failed...", null, res)
             }
             res.status(200).json(populated_match)
         })
}

/************************* Routes ***********************************/


/* addMatch
req.body contains home and away teams
*/

router.post('/', auth, function(req, res) {
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

/* getMatchByID
- Request needs match id. Returns match object
*/

router.get('/:match_id', auth, function(req, res) {
    if (!req.payload._id || !req.payload.email) {
        console.log("Get match. Unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }

    console.log('B: Getting match id -> ' + req.params.match_id)

    Match.findById(req.params.match_id)
    .populate({path: 'home'})
    .populate({path: 'away'})
    .exec(function(err, populated_match) {
        if (err) {
           return handleError("Error: Populating Match failed...", null, res)
        }
        res.status(200).json(populated_match)
    })
})



module.exports = router