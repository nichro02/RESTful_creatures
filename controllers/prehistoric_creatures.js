const express = require('express')
const router = express.Router()
const fs = require('fs')

//CREATURE INDEX ROUTE//
router.get('/', (req, res) => {
    //take text from prehistoric_creatures.json and store it in a variable
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    //convert the text into an array
    let creatureData = JSON.parse(creatures)
    //handle query string if there is one
    //console.log(req.query.nameFilter)
    //console.log(creatureData)
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

//EDIT CREATURE ROUTE
router.get('/edit/:idx', (req, res) => {
    //res.send('you have hit GET EDIT route for dino')
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    console.log(creatureData)
    res.render('prehistoric_creatures/edit', {creature: creatureData[req.params.idx], creatureId: req.params.idx})
})
router.put('/:idx', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    //UPDATE NAME AND TYPE FROM EDIT FORM
    creatureData[req.params.idx].type = req.body.type
    creatureData[req.params.idx].img_url = req.body.img_url
    console.log('looking at: ',req.body.type)
    console.log('Updated creature data: ', creatureData)
    //SAVE EDITED DATA
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})


//DELETE CREATURE ROUTE
router.delete('/:idx', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    //remove deleted dino
    creatureData.splice(req.params.idx, 1)
    
    //SAVE EDITED DATA
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

module.exports = router