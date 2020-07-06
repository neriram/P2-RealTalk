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

    res.render('entries')
})

//POST route to create new entry
router.post('/entries/new', function(req, res) {
    //connect to db to create new entry
    res.render('newEntry')
})

//export router
module.exports = router;
