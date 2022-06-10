var express = require("express");
var router = express.Router();
const ExpressError = require("../utils/ExpressError");
const userController = require('../controllers/user_controller')
const { userSchema } = require("../middleware/schemaValidation")
const passport = require("passport");
const catchAsync = require("../utils/catchAsync")
const { isloggedIn } = require("../middleware/isLoggedIn")

// check for form errors before take action
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
		next()
	}
}

router.route('/register')
	.get(userController.register)
	.post(validateUser, catchAsync(userController.registerLogic))

router.route('/login')
	.get(userController.login)
	.post(passport.authenticate('local', { failureRedirect: '/login' }), catchAsync(userController.loginLogic))

router.route('/:username')
	.get(isloggedIn, userController.profilePage)

router.route('/:username/edit-profile')
	.get(isloggedIn, userController.profileEdit)

    
router.delete('/logout', userController.logout)

module.exports = router;