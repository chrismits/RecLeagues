var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var app = express()
var cors = require('cors')
require('dotenv').config() // Developer Mode: Remove when done
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())



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


/***************************** Error Helpers ********************************/


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

/************************** Player API *************************************/
var playerRouter = require('./routes/player.js')
app.use('/api/players', playerRouter)


/************************* League API **************************************/

var leagueRouter = require('./routes/league.js')
app.use('/api/leagues', leagueRouter)

/************************* Team API ***************************************/

var teamRouter = require('./routes/team.js')
app.use('/api/teams', teamRouter)


/************************* Match API ***************************************/
var matchRouter = require('./routes/match.js')
app.use('/api/matches', matchRouter)


/************************* Server Setup ***************************************/

app.listen(process.env.PORT, function () {
    console.log('Server running on port ', process.env.PORT)
})
