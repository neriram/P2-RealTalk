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


//POST route for chat 
router.post('/chat', function(req, res) {

    res.render('chat')
})
//export router
module.exports = router;
