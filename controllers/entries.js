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
router.post('/new', function (req, res) {
    //connect to db to create new entry
    db.entry.create({
        feeling: req.body.feeling,
        content: req.body.content
    })
    //make call to api with form information
    axios.get({
        method: 'post',
        url: 'https://sentim-api.herokuapp.com/api/v1/',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: { "text": req.body.content }
        //analyze sentiment of text
        //render analysis to user
        //redirect to profile page
        //  res.redirect('/profile')

    }).then(function (response) {
        console.log(response)
    }).catch(function (error) {
        console.log(error)
    });
})

//export router
module.exports = router;