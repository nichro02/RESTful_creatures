//NEED TO MOVE DINO EJS FILES INTO DIONSAURS FILE AND UPDATE RES.RENDERS (SHOULD LOOK LIKE PRE-HISTORIC CREATURES)

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

app.get('/', (req, res) => {
    res.render('home.ejs')
})

//DINO INDEX ROUTE//
app.get('/dinosaurs', (req, res) => {
    //take text from dinosaurs.json and store it in a variable
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    //convert the text into an array
    let dinoData = JSON.parse(dinosaurs)

    //handle query string if there is one
    console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    //reassign dinoData to be array of dinos whose name matches query string that has been made case insensitive
    if(nameFilter) {
        dinoData = dinoData.filter(dino => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index.ejs', {dinosaurs: dinoData})

})

//NEW DINO PAGE ROUTE
app.get('/dinosaurs/new', (req,res) => {
    res.render('dinosaurs/new')
})

//DINO SHOW ROUTE//
app.get('/dinosaurs/:idx', (req, res) => {
    //take text from dinosaurs.json and store it in a variable
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    //convert the text into an array
    let dinoData = JSON.parse(dinosaurs)

    //get array index from url parameter
    let dinoIndex = parseInt(req.params.idx)

    console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show', {dinosaur: dinoData[dinoIndex], dinoId: dinoIndex})
})

//DINO POST ROUTE//
app.post('/dinosaurs', (req, res) => {
    //take text from dinosaurs.json and store it in a variable
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    //convert the text into an array
    let dinoData = JSON.parse(dinosaurs)
    //push new dino to array
    dinoData.push(req.body)
    //save new dinoData array to the dinosaurs.json file
    //JSON.stringify does opposite of JSON.parse
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to GET /dinosaurs route (the index)
    res.redirect('/dinosaurs')
})

//CREATURES INDEX ROUTE
app.get('/prehistoric_creatures', (req, res) => {
    //take text from prehistoric_creatures.json and store it in a variable
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    //convert the text into an array
    let creatureData = JSON.parse(creatures)
    //handle query string if there is one
    console.log(req.query.nameFilter)
    console.log(creatureData)
    let typeFilter = req.query.typeFilter
    //reassign creatureData to be array of dinos whose name matches query string that has been made case insensitive
    if(typeFilter) {
        creatureData = creatureData.filter(creature => {
            return creature.type.toLowerCase() === typeFilter.toLowerCase()
        })
    }

    res.render('prehistoric_creatures/index', {creatures: creatureData})
})

//NEW CREATURE PAGE ROUTE//
app.get('/prehistoric_creatures/new', (req,res) => {
    res.render('prehistoric_creatures/new')
})

//CREATURE SHOW ROUTE//
app.get('/prehistoric_creatures/:idx', (req, res) => {
    //take text from prehistoric_creatures.json and store it in a variable
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    //convert the text into an array
    let creatureData = JSON.parse(creatures)

    //get array index from url parameter
    let creatureIndex = parseInt(req.params.idx)

    console.log(creatureData[creatureIndex])
    res.render('prehistoric_creatures/show', {creature: creatureData[creatureIndex], creatureId: creatureIndex})
})

//CREATURE POST ROUTE//
app.post('/prehistoric_creatures', (req, res) => {
    //take text from prehistoric_creatures.json and store it in a variable
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    //convert the text into an array
    let creatureData = JSON.parse(creatures)
    //push new creature to array
    creatureData.push(req.body)
    //save new creatureData array to the dinosaurs.json file
    //JSON.stringify does opposite of JSON.parse
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    //redirect to GET /dinosaurs route (the index)
    res.redirect('/prehistoric_creatures')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})