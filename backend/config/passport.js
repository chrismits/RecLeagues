var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongoose = require('mongoose')
var Player = require('../models/player-model.js')
var Admin = require('../models/admin-model.js')


// Strategy definition of passport
passport.use('player-local',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
    Player.findOne({email: username}, function(err, pl) {
        if (err)
            return done(err)

        if (!pl) {
            return done(null, false, {
                message: 'Error: Player not found in DB'
            })
        }

        if (!pl.validPassword(password)) {
            return done(null, false, {
                message: 'Error: Password is incorrect'
            })
        }

        return done(null, pl)
    })
}))

passport.use('admin-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password, done) {
    Admin.findOne({email: username}, function(err, ad) {
        if (err)
            return done(err, false, {
                message: 'Error: Invalid parameters'
            })
        if (!ad) {
            return done(null, false, {
                message: 'Error: Admin not found in DV'
            })
        }

        if (!ad.validPassword(password)) {
            return done(null, false, {
                message: 'Error: Password is incorrect'
            })
        }

        return done(null, ad)
    })
}))