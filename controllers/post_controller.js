const Post = require("../models/post_model");
const User = require("../models/user_model");
const Comment = require("../models/comment_model");
const getUser = require("./user_controller");

module.exports.loadPosts = async (req, res) => {
    let posts = await Post.find()
        .populate("onwer")
        .populate("repost")
        .populate({ path: "commentId", populate: "userId" });
        const user = await User.findById(res.locals.currentUser.id)
    if (posts.length > 0) {
        if (req.query.user) {
            const user = await User.findOne({ username: req.query.user });
            posts = posts.filter((post) => post.onwer.id == user.id);
        }
        for (post of posts) {
            post.color = post.likeUsers.includes(res.locals.currentUser.id)
                ? "red"
                : "black";
            post.isSaved = user.savedPost.includes(post.id) ? true : false;
            post.save();
        }
        res.send(
            JSON.stringify({ // in case of load error delete JSON
                msg: "success",
                posts: posts.reverse(),
            })
        );
    } else {
        res.send(
            JSON.stringify({ // in case of load error delete JSON
                msg: "success",
                posts: "No posts",
            })
        );
    }
};

module.exports.loadTrending = async (req, res) => {
    const numberOfDaysToLookBack = req.query.days ? req.query.days : 7; // check for custom days filter
    const posts = await Post.find({
        createdAt: {
            $gte: new Date(
                new Date().getTime() -
                    numberOfDaysToLookBack * 24 * 60 * 60 * 1000
            ),
        },
    })
        .populate("onwer")
        .populate("repost")
        .populate({ path: "commentId", populate: "userId" })
        .sort({ likes: "DESC" })
        .limit(1)
        // .lean() //returns a JavaScript object instead of a Mongoose document.
        // .exec();
    if (posts.length > 0) {
        res.send(JSON.stringify({ // in case of load error delete JSON
                msg: "success",
                posts: posts.reverse(),
            })
        );
    } else {
        res.send(
            JSON.stringify({ // in case of load error delete JSON
                msg: "success",
                posts: "No posts",
            })
        );
    }
    // res.render('trending_view')
}

module.exports.renderIndex = (req, res) => {
    res.render("index_view");
};

module.exports.createPost = async (req, res) => {
    // const user = await User.findById(req.user.id);
    const post = new Post(req.body);
    post.onwer = res.locals.currentUser.id;
    post.save();
    res.redirect(res.locals.appUrl);
};

module.exports.likePost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    post.likeUsers.includes(res.locals.currentUser.id)
        ? ((post.likeUsers = post.likeUsers.filter(
              (likeUser) => likeUser != res.locals.currentUser.id
          )),
          (color = "black"))
        : (post.likeUsers.push(res.locals.currentUser.id), (color = "red"));
    post.likes = post.likeUsers.length;
    post.color = color;
    post.save();
    res.send({ like: post.likes, color });
};

module.exports.commentPost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    const comment = new Comment(req.body);
    comment.userId = res.locals.currentUser.id;
    comment.postId = post.id;
    post.commentId.push(comment._id);
    post.comments = post.commentId.length;
    await comment.save();
    await post.save();
    const data = await Comment.findById(comment._id).populate("userId");
    res.send({ body: data, comments: post.comments });
};

module.exports.editPost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.render("post-edit_view", { post });
};

module.exports.editPostLogic = async (req, res) => {
    await Post.findByIdAndUpdate(req.params.postId, req.body).save();
    res.redirect("/");
};

module.exports.repost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.render("repost_view", { post });
};

module.exports.savePost = async (req, res) => {
    const savePost = await Post.findById(req.params.postId)
    const user = await User.findById(res.locals.currentUser.id)
    user.savedPost.push(savePost.id)
    user.save()
}

module.exports.unsavePost = async (req, res) => {
    const unsavePost = await Post.findById(req.params.postId)
    const user = await User.findById(res.locals.currentUser.id)
    user.savedPost = user.savedPost.filter(post => post != unsavePost.id)
    await user.save()
}

module.exports.renderSavedPost = async (req, res) => {
    const user = await User.findById(res.locals.currentUser.id)
    var savedPosts = []
    for (postId of user.savedPost){
        // const post = await Post.findById(postId)
        // if(post)
        //     savedPosts.push(post)
            savedPosts.push(await Post.findById(postId).populate('onwer'))
    }
    res.send(
        JSON.stringify({ // in case of load error delete JSON
            msg: "success",
            posts: savedPosts.reverse(),
        })
    )
}

module.exports.deleteComment = async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    let post = await Post.findById(comment.postId);
    post.commentId = post.commentId.filter(
        (commentId) => commentId != comment.id
    );
    post.comments = post.commentId.length;
    post.save();
    res.send({ comments: post.comments });
};

module.exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId);
};
