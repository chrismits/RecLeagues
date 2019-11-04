// Modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')


// Connect to db
var db_setup = require('./config/setup.js')
mongoose.connect(db_setup.db_url, {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to database'))

// routes
require('./routes')(app);

// start app at http://localhost:3000
var port = 3000
app.listen(port);               
// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;         