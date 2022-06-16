const Post = require("../models/post_model");
const User = require("../models/user_model");

module.exports.loadPosts = async (req, res) => {
    const posts = await Post.find().populate("onwer");
    for(post of posts) {
        post.color = post.likeUsers.includes(res.locals.currentUser.id) ? "red" : "black";
    }
    post.save()
    res.send({
        msg: "success",
        posts: posts.reverse(),
    });
};

module.exports.renderIndex = (req, res) => {
    res.render("index_view");
};

module.exports.createPost = async (req, res) => {
    // const user = await User.findById(req.user.id);
    const post = new Post(req.body);
    post.onwer = res.locals.currentUser.id
    post.save();
    res.redirect(res.locals.appUrl);
};

module.exports.likePost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    post.likeUsers.includes(res.locals.currentUser.id)
        ? (post.likeUsers = post.likeUsers.filter((likeUser) => likeUser != res.locals.currentUser.id), color = "black")
        : (post.likeUsers.push(res.locals.currentUser.id), color = "red");
    post.likes = post.likeUsers.length;
    post.color = color
    post.save();
    res.send({ like: post.likes, color })
};

module.exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId)
}