/* auth.js
- Contains all the routes for authentication of Player and Admin
*/

/******************** Configuration ***************************/ 

const express = require('express')
const router = express.Router()
var app = express()
var passport = require('passport')
require('../config/passport')
app.use(passport.initialize())

var Admin = require('../models/admin-model.js')
var Player = require('../models/player-model.js')


/******************** Helpers ***************************/ 

function handleError (e, obj, res) {
    if (e) {
        res.status(400).json(e)
    } else {
        res.status(200).json(obj)
    }
}

/******************** Routes ***************************/ 

// Admin Signup: Needs name, email, password
router.post('/admin/signup', function (req, res) {
    console.log("B: Signing up Admin in authorization mode")
    var admin = new Admin();

    if (!req.body.name || !req.body.email || !req.body.password) {
        return handleError('Error: Required fields not found', null, res)
    }

    admin.name = req.body.name
    admin.email = req.body.email

    admin.setPassword(req.body.password)

    admin.save(function(err, ad) {
        if (err) {
            return handleError('Error: Admin could not be saved', null, res)
        }
        var token = ad.generateJWT()
        res.status(200).json({
            "token": token,
            "user": ad
        })
    })
})

// Admin Login: Needs email, password
router.post('/admin/login', function(req, res) {
    console.log("BAAACK: Admin Login")
    passport.authenticate('admin-local', function(err, user, info) {
        var token;
        if (err) {
            console.log(err)
            return handleError('Error: Could not authenticate', null, res)
        }

        if (user) {
            token = user.generateJWT()
            res.status(200).json({
                "token" : token,
                "user": user
            })
        } else {
            res.status(401).json(info)
        }
    })(req, res)
})

//Player Signup: Needs first name, last name, email, password
router.post('/players/signup', function(req, res) {
    console.log("B: Signing up Player in authorization mode")
    var pl = new Player();

    if (!req.body.first || !req.body.last ||
        !req.body.email || !req.body.password) {
        return handleError('Error: Required fields not found', null, res)
    }

    pl.first = req.body.first
    pl.last = req.body.last
    pl.email = req.body.email

    pl.setPassword(req.body.password)

    pl.save(function(err, player) {
        if (err) {
            return handleError('Error: Player could not be saved', null, res)
        }
        var token = player.generateJWT()
        res.status(200).json({
            "token": token, 
            "user": player
        })
    })
})

//Player Login: needs email and password
router.post('/players/login', function(req, res) {
    console.log("B: Player Login")
    passport.authenticate('player-local', function(err, user, info) {
        var token;
        if (err) {
            res.status(404).json(err)
            return
        }

        if (user) {
            token = user.generateJWT();
            res.status(200).json({
                "token": token,
                "user": user
            })
        } else {
            res.status(401).json(info)
        }
    })(req, res)
})

module.exports = router