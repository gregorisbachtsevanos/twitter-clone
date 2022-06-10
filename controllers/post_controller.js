const Post = require("../models/post_model");
const User = require("../models/user_model");

module.exports.loadPosts = async (req, res) => {
    const posts = await Post.find().populate("userId");
    res.send({
        msg: "success",
        posts,
    });
};

module.exports.renderIndex = (req, res) => {
    res.render("index_view");
};

module.exports.createPost = async (req, res) => {
        const user = await User.findById(req.user.id);
        const post = new Post(req.body);
        post.userId = user.id;
        post.save();
        res.redirect(res.locals.appUrl);
};
