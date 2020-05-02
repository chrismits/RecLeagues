var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var app = express()
const path = require('path')
var cors = require('cors')
require('dotenv').config() // Developer Mode: Remove when done
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

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

// Error Handling
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"message" : err.name + ": " + err.message})
    }
})

/********************* Authentication ***************************************/
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


/************************* Server Setup *************************************/


// Redirect all get to static pages....
app.use(express.static(`${__dirname}/dist/real-app`));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/real-app/index.html'))
})



var port = process.env.PORT || 8888

app.listen(port, function () {
    console.log('Server running on port ', port)
})
