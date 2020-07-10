//require express
const express = require('express')
//import router
const router = express.Router();
//import db
const db = require('../models')
//import middleware
const flash = require('connect-flash')
//update require to passport config file path
const passport = require('../config/ppConfig');
//require axios
const axios = require('axios')



//GET route to view all entries
router.get('/', function(req, res) {
    //connect to db to find all 
    db.entry.findAll().then(function (entry){
        console.log(entry)
    })
    res.render('entries/allEntries')
})

//GET route to create new entry
router.get('/new', function(req, res) {
    res.render('entries/newEntry')
})

//POST route to create new entry
router.post('/', function (req, res) {
    //connect to db to create new entry
    db.entry.create({
        feeling: req.body.feeling,
        content: req.body.content
    })
    //make call to api with form information
    axios.post('https://sentim-api.herokuapp.com/api/v1/',
        { "text": req.body.content }
        //analyzes sentiment of text

    ).then(function (response) {
        console.log(response.data)
        //render the data response from API to user in allEntries.ejs view
        res.render('entries/allEntries', {
            feeling: req.body.feeling,
            content: req.body.content,
            response: response.data
        })
    }).catch(function (error) {
        console.log(error)
        //redirect to profile page
        res.redirect('/profile')
    });
})

//export router
module.exports = router;