const express = require('express')
const router = express.Router()
const fs = require('fs')

//INDEX ROUTE//
router.get('/', (req, res) => {
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

//DINO PAGE ROUTE
router.get('/new', (req,res) => {
    res.render('dinosaurs/new')
})

//SHOW ROUTE//
router.get('/:idx', (req, res) => {
    //take text from dinosaurs.json and store it in a variable
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    //convert the text into an array
    let dinoData = JSON.parse(dinosaurs)

    //get array index from url parameter
    let dinoIndex = parseInt(req.params.idx)

    console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show', {dinosaur: dinoData[dinoIndex], dinoId: dinoIndex})
})

//POST ROUTE//
router.post('/', (req, res) => {
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



module.exports = router