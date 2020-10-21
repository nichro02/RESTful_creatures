const express = require('express')
const app = express()

app.set('view engine', 'ejs')

//import express-ejs-layouts and require it
const ejsLayouts = require('express-ejs-layouts')
//set up middleware
app.use(ejsLayouts)
//body-parser middleware allows us to use req.body in dino post route
app.use(express.urlencoded({extended: false}))

const fs = require('fs')

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/public'))

//Set up home route
app.get('/', (req, res) => {
    res.render('home.ejs')
})

//Set up controllers
const dinoController = require('./controllers/dinosaurs')
const creatureController = require('./controllers/prehistoric_creatures')

app.use('/dinosaurs', dinoController)
app.use('/prehistoric_creatures', creatureController)


app.listen(3000, () => {
    console.log('listening on port 3000')
})