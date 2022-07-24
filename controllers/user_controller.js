import User from "../models/user_model.js";
import Post from "../models/post_model.js";
import userSchema from '../middleware/schemaValidation.js'

const register = (req, res) => {
    if (!req.user) {
        return res.render("register_view");
    }
    console.log("Error: User has not been provided");
};

const registerLogic = async (req, res, next) => {
    try {
        const {
            firstname,
            surname,
            username,
            email,
            year_of_birth,
            month_of_birth,
            day_of_birth,
            gender,
            password,
            repeat_password,
        } = req.body;
        if (password == repeat_password) {
            const user = await new User({
                firstname,
                surname,
                username,
                email,
            });
            (user.extra_info.year_of_birth = year_of_birth),
                (user.extra_info.month_of_birth = month_of_birth),
                (user.extra_info.day_of_birth = day_of_birth),
                (user.extra_info.gender = gender);
            const newUser = await User.register(user, password);
            req.login(newUser, (err) => {
                if (err) return next(err);
                res.redirect(res.locals.appUrl);
            });
        } else {
            res.redirect("/register", { error: "Passwords not match" });
        }
    } catch (err) {
        console.log(err);
    }
};

const login = (req, res) => {
    res.render("login_view");
};

const loginLogic = async (req, res) => {
    res.redirect(res.locals.appUrl);
};

const profilePage = async (req, res) => {
    const user = await getUser(req.params.username);
    if (user) var posts = await Post.find({ onwer: user.id });
    if (user.id != res.locals.currentUser.id) {
        const currentUser = await getUser(res.locals.currentUser.username);
        var u = currentUser.following.map((id) => id == user.id);
        btn = u[0] ? "unfollow" : "follow";
        return res.render("profile_view", { user, posts, btn });
    }
    // var encryptedId = btoa(user.id)}
    res.render("profile_view", { user, posts });
};

const profileEdit = async (req, res) => {
    const user = await getUser(req.params.username);
    res.render("profile-edit_view", { user });
};

const profileEditLogic = async (req, res) => {
    var body = {};
    var extra_info = {};
    updateUser(req, body, extra_info);
    if (Object.keys(extra_info).length > 0) body.extra_info = extra_info;
    const user = await User.findByIdAndUpdate(res.locals.currentUser.id, body);
    user.save();
    res.redirect(`/${user.username}`);
};

const settings = async (req, res) => {
    const user = await getUser(req.params.username);
    res.render("settings_view", { user });
};

const settingsLogic = async (req, res) => {
    console.log("settingsLogic:", req.body);
};

const followSystem = async (req, res) => {
    const currentUser = await getUser(res.locals.currentUser.username);
    const user = await getUser(req.params.username);
    await currentUser.following.push(user.id);
    await user.followers.push(currentUser.id);
    await currentUser.save();
    await user.save();
    res.redirect(`/${user.username}`);
};

const showPost = async (req, res) => {
    const post = await Post.findById(req.params.id).populate("onwer");
    console.log(post);
    res.send(post);
};

const unfollowSystem = async (req, res) => {
    const currentUser = await getUser(res.locals.currentUser.username);
    const user = await getUser(req.params.username);
    currentUser.following = await currentUser.following.filter(
        (id) => id != user.id
    );
    user.followers = await user.followers.filter((id) => id != currentUser.id);
    currentUser.save();
    user.save();
    res.redirect(`/${user.username}`);
};

const trending = (req, res) => {
    res.render("trending_view");
};

const search = async (req, res) => {
    let { search } = req.body;
    const users = await User.find({
        username: { $regex: "^" + search, $options: "i" },
    });
    res.send({ users });
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).clearCookie("connect.sid", {
            path: "/",
        });
        req.session.destroy(function (err) {
            res.redirect("/");
        });
    });
};

function updateUser(req, body, extra_info) {
    extra_info.year_of_birth = req.body.year_of_birth;
    extra_info.month_of_birth = req.body.month_of_birth;
    extra_info.day_of_birth = req.body.day_of_birth;
    extra_info.gender = req.body.gender;
    if (req.body.firstname != "") body.firstname = req.body.firstname;
    if (req.body.surname != "") body.surname = req.body.surname;
    if (req.body.username != "") body.username = req.body.username;
    if (req.body.email != "") body.email = req.body.email;
    if (req.body.phone != "") body.extra_info.phone = req.body.phone;
    if (req.body.bio != "") body.extra_info.bio = req.body.bio;
    if (req.body.facebook != "") extra_info.facebook = req.body.facebook;
    if (req.body.instagram != "") extra_info.instagram = req.body.instagram;
    if (req.body.twitter != "") extra_info.twitter = req.body.twitter;
    if (req.body.linkedin != "") extra_info.linkedin = req.body.linkedin;
    if (req.body.website != "") extra_info.website = req.body.website;
    if (req.body.youtube != "") extra_info.youtube = req.body.youtube;
    if (req.body.github != "") extra_info.github = req.body.github;
    if (req.body.upwork != "") extra_info.upwork = req.body.upwork;
}

function getUser(username) {
    return User.findOne({ username });
}

export default {
    getUser,
    register,
    registerLogic,
    login,
    loginLogic,
    loginLogic,
    profilePage,
    profileEdit,
    profileEditLogic,
    settings,
    settingsLogic,
    followSystem,
    showPost,
    unfollowSystem,
    trending,
    search,
    logout
};
