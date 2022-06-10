module.exports.isloggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.redirect('/login')
    }
    next()
}