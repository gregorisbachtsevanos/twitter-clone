import express from 'express';
import ExpressError from '../utils/ExpressError.js'
import userController from '../controllers/user_controller.js'
import userSchema from '../middleware/schemaValidation.js'
import passport from 'passport';
import catchAsync from '../utils/catchAsync.js';
import isloggedIn from '../middleware/isLoggedIn.js'
import isAuth from '../middleware/isAuth.js';
const router = express.Router();

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

router.get('/trending', isloggedIn, catchAsync(userController.trending))

router.get('/post/:id', userController.showPost)

router.route('/:username')
	.get(isloggedIn, catchAsync(userController.profilePage))

router.route('/:username/edit-profile')
	.get(isloggedIn, isAuth, userController.profileEdit)
	.patch(isloggedIn, isAuth, userController.profileEditLogic)

router.route('/:username/settings')
	.get(isloggedIn, isAuth, userController.settings)
	.patch(isloggedIn, isAuth, userController.settingsLogic)

router.post('/:username/follow', isloggedIn, userController.followSystem)

router.post('/:username/unfollow', isloggedIn, userController.unfollowSystem)

router.post('/search', isloggedIn, userController.search)
    
router.delete('/logout', userController.logout)

export default  router;