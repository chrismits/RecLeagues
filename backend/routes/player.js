/* player.js
- Contains all API routes of Player
*/

/******************** Configuration ***************************/ 
const express = require('express')
const router = express.Router()
var mongoose = require('mongoose')

var Player = require('../models/player-model.js')
var Team = require('../models/team-model.js')


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
/********************** Routes ******************************/ 

// addPlayer: Inactive, works only for administrators
router.post('/', auth, function (req, res) {
    if (!req.payload._id || !req.payload.email ||
        !req.payload.admin) {
            console.log("AUTH FAILED: Admin Only")
            return res.status(401).json({
                "message": "UnauthorizedError: Private Admin Information. Login to access"
            })
    }
    console.log("B: Adding Player")
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

---> NOTE: ONLY ALLOWED AS ADMIN
*/
router.get('/:email', auth, function (req, res) {
    console.log("B: Getting Player by Email")
    console.log(req.payload)

    if (!req.payload._id || !req.payload.email) {
        console.log("AUTH FAILED: getplayerbyEmail unathorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }

    if (!req.payload.admin) {
        console.log("AUTH FAILED: Not Admin")
        return res.status(401).json({
            "message" : "UnauthorizedError: Needs Administrative Privileges"
        })
    }

    console.log(req.params.email)
    
    Player.findOne({ email: req.params.email }, function (err, pl) {
        if (err || !pl) {
            return handleError('Error: Could not find player', null, res)
        }
        else {
            res.status(200).json(pl)
        }
    })
})

/*** getTeamsofPlayer
 * Gets all teams for one player. Requires player ID
*/
router.get('/teams/:id', auth, function (req, res) {
    console.log("BACCC: Getting all Teams of player")

    if (!req.payload._id || !req.payload.email) {
        console.log("Get teams of player. unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }
    
    var search_id = mongoose.Types.ObjectId(req.params.id)

    // For now accessible to both player and admin
    // var search_id = mongoose.Types.ObjectId(req.payload._id)
    // if (req.payload.admin === true) {
    //     search_id = mongoose.Types.ObjectId(req.params.id)xs
    // }

    // testing for auth
    Team.find({"players": search_id})
        .populate('players')
        .populate('captain')
        .exec(function(err, teams) {
            if (err) {
                console.log(err)
                return handleError("Error: Something went wrong when searching teams", null, res)
            }
            else if (teams.length === 0){
                console.log("Player is not a member of any team")
                res.status(200).json([])
            }
            else {
                res.status(200).json(teams)
            }
        })
})

/**** getPlayers
- Returns all player documents in db
Backend: Tested
ApiService: Tested
Frontend Service: Tested
****/
router.get('/', auth, function (req, res) {
    console.log('B: Getting All Players')

    if (!req.payload._id || !req.payload.email) {
        console.log("Error in getting all players. Unauthorized access (Admin privileges required)")
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

    Player.find(function (err, players) {
        if (err || (players.length === 0)) { 
            return handleError('Error: Could not find players in db', null, res) 
        }
        res.json(players) // return all players in JSON format
    })
})


/* Update Player
 Backend: Tested
 ApiService: Tested
 Frontend Service: Tested
*/
router.put('/', auth, function (req, res) {
    console.log('B: Updating Player')

    if (!req.payload._id || !req.payload.email) {
        console.log("Update player. unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }

    // For now accessible to both player and admin.
    // If player -> can only update personal account
    // If admin -> can update whatever player they send in body
    var search_id = mongoose.Types.ObjectId(req.payload._id)
    if (req.payload.admin === true) {
        search_id = mongoose.Types.ObjectId(req.body.id)
    }

    //testing for auth
    Player.findById(search_id, function(err, pl) {
        if (err || !pl) {
            return handleError("Error: Player not found in db, cannot update", null, res)
        }

        // update fields
        pl.first = req.body.first
        pl.last = req.body.last
        pl.cell = req.body.cell
        pl.email = req.body.email
        pl.signedWaiver = req.body.waiver
        pl.pronouns = req.body.pronouns

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


/**** deletePlayer:
Backend: Tested
ApiService:
Frontend Service:
- Remove from player db
- Remove from all teams, etc.
- What happens to team captain if player to be deleted is captain???
****/
router.delete('/:email', auth, function (req, res) {
    if (!req.payload._id || !req.payload.email) {
        console.log("Update player. unauthorized access")
        return res.status(401).json({
            "message" : "UnauthorizedError: Private Information. Login to access"
        })
    }
    console.log("B: Deleting Player")

    var email_search = req.payload.email
    if (req.payload.admin === true) {
        email_search = req.params.email
    } else {
        if (req.payload.email !== req.params.email) {
            return res.status(401).json({
                "message" : "UnauthorizedError: Can only delete self as player"
            })
        }
    }

    Player.findOneAndDelete({email: email_search}, function(err, player) {
        if (err || !player)
            handleError("Error: Could not delete player")
        else {
            Team.update({"players": player._id}, 
                        {$inc: {'size': -1}, $pull: {players: player._id}},
                        {multi: true}, function(err, teams) {
                            if (err) {
                                handleError("Error in removing deleted player from all teams", null, res)
                            }

                            res.status(200).json({"deleted":player})
                        })
        }
    });
})

















module.exports = router