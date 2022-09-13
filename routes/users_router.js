import express from "express";
import ExpressError from "../utils/ExpressError.js";
import userController from "../controllers/user_controller.js";
import validation from "../middleware/schemaValidation.js";
import passport from "passport";
import catchAsync from "../utils/catchAsync.js";
import isloggedIn from "../middleware/isLoggedIn.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/image_uploader.js";
const router = express.Router();

// check for form errors before take action
const validateUser = (req, res, next) => {
    const { error } = validation.userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router
    .route("/register")
    .get(userController.register)
    .post(validateUser, catchAsync(userController.registerLogic));

router
    .route("/login")
    .get(userController.login)
    .post(
        passport.authenticate("local", { failureRedirect: "/login" }),
        catchAsync(userController.loginLogic)
    );

router.get("/messages", isloggedIn, catchAsync(userController.messagesPage));

router.get("/chat/:id", isloggedIn, catchAsync(userController.chatPage));

router.get("/chatList", isloggedIn, catchAsync(userController.loadChatList));

router.route("/messages/new")
    .get(isloggedIn, catchAsync(userController.createChatPage))
    .post(isloggedIn, catchAsync(userController.createChatLogic));

router.get("/trending", isloggedIn, catchAsync(userController.trending));

router.get("/post/:id", isloggedIn, catchAsync(userController.showPost));

router.post("/search", isloggedIn, userController.search);

router
    .route("/:username")
    .get(isloggedIn, catchAsync(userController.profilePage))
    .patch(
        isloggedIn,
        upload.single("avatar"),
        isAuth,
        userController.avatarUpload
    );

router
    .route("/:username/edit-profile")
    .get(isloggedIn, isAuth, userController.profileEdit)
    .patch(
        isloggedIn,
        // upload.single("avatar"),
        // upload.single("cover_image"),
        isAuth,
        userController.profileEditLogic
    );

router
    .route("/:username/settings")
    .get(isloggedIn, isAuth, userController.settings)
    .patch(isloggedIn, isAuth, userController.settingsLogic);

router.post("/:username/follow", isloggedIn, userController.followSystem);

router.post("/:username/unfollow", isloggedIn, userController.unfollowSystem);

router.delete("/logout", userController.logout);

export default router;
