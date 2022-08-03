const isloggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.redirect('/login')
    }
    next()
}
export default isloggedIn