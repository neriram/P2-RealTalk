//required npm libraries
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
//passport, and custom middleware, sequelize sesssions, 
const passport = require('./config/ppConfig');
const db = require('./models');
//want to add a link to our customer middleware for isLoggedIn
const isLoggedIn = require('./middleware/isLoggedIn');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// app setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());

//crete new instnc eof class Sequelize Store
const sessionStore = new SequelizeStore({
    db: db.sequelize,
    expiration: 1000 * 60 * 30
    
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}))

sessionStore.sync();

//initialize and link flash message, passport, and session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;

    next();
})

//ROUTES
app.get('/', function(req, res) {
    //check to see if user is logged in
    res.render('index')
})

//auth locked route
app.get('/profile',isLoggedIn, function(req, res) {
    res.render('profile');
    
})
//include auth controller
app.use('/auth', require('./controllers/auth'));
//initizalize app on port
app.listen(process.env.PORT || 3000, function(){
    console.log(`listening on ${process.env.PORT}`)
});

