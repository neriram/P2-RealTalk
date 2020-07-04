//write function we are going to use as middleware
module.exports = function(req, res, next) {
    console.log('******************')
    console.log(req.user)
    if (!req.user) {
        req.flash('error', 'You must be logged in to view this page');
        //redirect user to auth/login 
        res.redirect('/auth/login')
    } else {
        next()
    }
}   
//check to see if we have a user variable set

//if we do will allow our app to carry on

//if we dont we will let user know they have to be logged in to access

