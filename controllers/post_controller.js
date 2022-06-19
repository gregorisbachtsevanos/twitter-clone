const Post = require("../models/post_model");
const User = require("../models/user_model");

module.exports.loadPosts = async (req, res) => {
    let posts = await Post.find().populate("onwer").populate('repost')
    if (req.query.user) {
        posts = posts.filter((post) => post.onwer.id == req.query.user)
    }
    for (post of posts) {
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
    // console.log(post)
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

module.exports.commentPost = async (req, res) => {
    const post = await Post.findById(req.params.postId)
    console.log(post)
    res.send(req.body)
}

module.exports.editPost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.render('post-edit_view', { post })
}

module.exports.editPostLogic = async (req, res) => {
    await Post.findByIdAndUpdate(req.params.postId, req.body).save()
    res.redirect('/')
}

module.exports.repost = async (req, res) => {
    const post = await Post.findById(req.params.postId)
    res.render('repost_view', { post })
}

module.exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId)
}