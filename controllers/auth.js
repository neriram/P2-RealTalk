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


//ROUTES
//register GET route
router.get('/register', function(req, res) {
    res.render('auth/register')
})
//register POST route
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        //if user was created
        if (created) {
            //authenticate user and start authorization process
            console.log('user created!');
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'Thanks for signing up!'
            })(req, res);
        } else {
            console.log('user email already exists')
            //else if user already exists
             //send error to user that email already exists
            req.flash('error', 'Error: email already exists for user. Try again.')
            //redirect to register get route
            res.redirect('/auth/register');
        }
    }).catch(function(err) {
        console.log(`Error found. \nMessage: ${err.message}. \nPlease review: ${err}`);
        req.flash('error', err.message);
        res.redirect('/auth/register');
    })
})

//login GET route
router.get('/login', function(req, res) {
    res.render('auth/login');
})
//login POST route
//toDo: pass next param to function
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        //if no user authenticated 
        if (!user) {
            req.flash('error', 'Invalid username or password');
            //redirect our user to try logging in again
            return res.redirect('/auth/login');
        }
        if (error) {
            //TODO: add next param from function
            return next(error);
        }
        req.login(user, function (error) {
            //if error move to error
            if (error) next(error); 
            //if success flash success message
            req.flash('success', 'You are validated and logged in')
            //if success save session and redirect user
            req.session.save(function() {
                return res.redirect('/profile');
            });
        })
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})
//export router
module.exports = router;
