var express = require('express')
var app = express()
var cors = require('cors')
var routes = require('./Routes/Routes')
var model=require('./Model/Model')

app.use(cors())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('View'));
app.use('/', routes)


model.installation() //Used for creating database, and tables for first time

app.listen(3000, () => {
    console.log("app running on port 3000")
})
