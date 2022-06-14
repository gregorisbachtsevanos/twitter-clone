const Post = require("../models/post_model");
const User = require("../models/user_model");

module.exports.loadPosts = async (req, res) => {
    const posts = await Post.find().populate("userId");
    res.send({
        msg: "success",
        posts: posts.reverse(),
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

module.exports.likePost = async (req, res) => {
    const post = await Post.findById(req.params.postId)
    post.likes ? post.likes++ : post.likes = 1
    post.save()
    console.log(post)
}