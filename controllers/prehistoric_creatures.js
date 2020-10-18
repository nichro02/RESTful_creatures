const express = require('express')
const router = express.Router()
const fs = require('fs')

//CREATURES INDEX ROUTE
router.get('/', (req, res) => {
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
router.get('/new', (req,res) => {
    res.render('prehistoric_creatures/new')
})

//CREATURE SHOW ROUTE//
router.get('/:idx', (req, res) => {
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
router.post('/', (req, res) => {
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


module.exports = router