const express = require("express");
const router = express.Router();
const postController = require("../controllers/post_controller");
const { isloggedIn } = require("../middleware/isLoggedIn");
const catchAsync = require("../utils/catchAsync");
const { postSchema } = require("../middleware/schemaValidation")
const ExpressError = require("../utils/ExpressError");

// check for form errors before take action
const validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
		next()
	}
}

router.get("/", isloggedIn, postController.renderIndex);

router.get("/load-posts", postController.loadPosts);

router.post("/new-post", isloggedIn, validatePost, catchAsync(postController.createPost));

module.exports = router;
