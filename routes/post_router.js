import express from "express";
import postController from "../controllers/post_controller.js";
import isloggedIn from "../middleware/isLoggedIn.js";
import catchAsync from "../utils/catchAsync.js";
import validation from "../middleware/schemaValidation.js";
import ExpressError from "../utils/ExpressError.js";
import path from "path";
import upload from "../middleware/image_uploader.js";
const router = express.Router();

// check for form errors before take action
const validatePost = (req, res, next) => {
    const { error } = validation.postSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    }
};

router.get("/", isloggedIn, postController.renderIndex);

router.get("/load-posts", isloggedIn, catchAsync(postController.loadPosts));

router.get(
    "/load-trending",
    isloggedIn,
    catchAsync(postController.loadTrending)
);

router.get(
    "/saved-posts",
    isloggedIn,
    catchAsync(postController.renderSavedPost)
);

router.get(
    "/hidden-posts",
    isloggedIn,
    catchAsync(postController.renderHiddenPost)
);

router.get(
    "/user-posts/:username",
    isloggedIn,
    catchAsync(postController.renderUserPosts)
);

router
    .route("/edit-post/:postId([0-9a-f]{24})")
    .get(isloggedIn, postController.editPost)
    .patch(isloggedIn, postController.editPostLogic);

router.get("/repost/:postId", isloggedIn, catchAsync(postController.repost));

router.get(
    "/save-post/:postId",
    isloggedIn,
    catchAsync(postController.savePost)
);

router.get(
    "/unsave-post/:postId",
    isloggedIn,
    catchAsync(postController.unsavePost)
);

router.post(
    "/visability-post/:postId",
    isloggedIn,
    catchAsync(postController.visabilityPost)
);

router.post(
    "/new-post",
    isloggedIn,
    upload.array("file"),
    // vaidatePost,
    catchAsync(postController.createPost)
);

router.post(
    "/like-post/:postId",
    isloggedIn,
    catchAsync(postController.likePost)
);

router.post(
    "/comment-post/:postId",
    isloggedIn,
    catchAsync(postController.commentPost)
);

router.delete(
    "/delete-post/:postId",
    isloggedIn,
    catchAsync(postController.deletePost)
);

router.delete(
    "/delete-comment/:commentId",
    isloggedIn,
    catchAsync(postController.deleteComment)
);

export default router;