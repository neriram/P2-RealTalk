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



//GET route to view all entries
router.get('/', function(req, res) {
    //connect to db to find all 

    res.render('entries/allEntries')
})

//GET route to create new entry
router.get('/new', function(req, res) {
    res.render('entries/newEntry')
})
router.post('/new', function(req, res) {
 //connect to db to create new entry
 //redirect to profile
})


//export router
module.exports = router;
