// Modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')
global.mongoose = mongoose
var bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

// Connect to db
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
      console.log(err);
    }
  });

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