if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config()
}

const express = require('express')
const app = express()

//database connections
var db = require('./config/db')
// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
// console.log('YOOOO')
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to database'))

//import router
const indexRouter = require('./routes/index')

//Configure express app 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public')) //images and other static files

app.use('/', indexRouter)

app.listen(process.env.PORT)

