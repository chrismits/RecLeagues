// Modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

// Connect to db
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to database'))


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
require('./routes')(app);

// start app at http://localhost:3000
var port = process.env.PORT || 8080;
app.listen(port);               
// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;