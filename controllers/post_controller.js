import Post from "../models/post_model.js";
import User from "../models/user_model.js";
import Comment from "../models/comment_model.js";
import multer from "multer";

const loadPosts = async (req, res) => {
    console.log(req.path) // /load-posts
    let posts = await Post.find()
        .populate("onwer")
        .populate("repost")
        .populate({ path: "commentId", populate: "userId" });
    const user = await User.findById(res.locals.currentUser.id);
    if (posts.length > 0) {
        if (req.query.user) {
            const user = await User.findOne({ username: req.query.user });
            posts = posts.filter((post) => post.onwer.id == user.id);
        }
        for (let post of posts) {
            post.color = post.likeUsers.includes(res.locals.currentUser.id)
                ? "red"
                : "black";
            post.isSaved = user.savedPost.includes(post.id) ? true : false;
            post.save();
        }
        res.send(
            JSON.stringify({
                // in case of load error delete JSON
                msg: "success",
                posts: posts.reverse(),
            })
        );
    } else {
        res.send(
            JSON.stringify({
                // in case of load error delete JSON
                msg: "success",
                posts: "No posts",
            })
        );
    }
};

const loadTrending = async (req, res) => {
    const numberOfDaysToLookBack = req.query.days ? req.query.days : 7; // check for custom days filter
    const posts = await Post.find({
        // createdAt: {
        //     $gte: new Date(
        //         new Date().getTime() -
        //             numberOfDaysToLookBack * 24 * 60 * 60 * 1000
        //     ),
        // },
    })
        .populate("onwer")
        .populate("repost")
        .populate({ path: "commentId", populate: "userId" })
        .sort({ likes: "DESC" })
        .limit(5);
    // .lean() //returns a JavaScript object instead of a Mongoose document.
    // .exec();
    if (posts.length > 0) {
        res.send(
            JSON.stringify({
                // in case of load error delete JSON
                msg: "success",
                posts: posts.reverse(),
            })
        );
    } else {
        res.send(
            JSON.stringify({
                // in case of load error delete JSON
                msg: "success",
                posts: "No posts",
            })
        );
    }
    // res.render('trending_view')
};

const renderIndex = (req, res) => {
    res.render("index_view");
};

const createPost = async (req, res, next) => {
    var data = {}
    if (req.files != '') {
        if (req.files.length > 1) {

        } else {
            data.image = req.files[0].originalname
        }
    }
    var hashtag, mention = false
    if (req.body.post != '') {
        if (req.body.post.includes('#')) hashtag = true
        if (req.body.post.includes('@')) mention = true
        data.post = req.body.post
    }
    const post = new Post(data);
    if (hashtag) post.hasHashtag = true
    if (mention) post.hasMention = true
    post.onwer = res.locals.currentUser.id;
    post.save();
    res.redirect(res.locals.appUrl);
};

const likePost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    var color = '';
    if (post.likeUsers.includes(res.locals.currentUser.id)) {
        post.likeUsers = post.likeUsers.filter((likeUser) => likeUser != res.locals.currentUser.id);
        color = "black";
    } else {
        post.likeUsers.push(res.locals.currentUser.id);
        color = "red";
    }
    post.likes = post.likeUsers.length;
    post.color = color;
    post.save();
    res.send({ like: post.likes, color });
};

const commentPost = async (req, res) => {
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

const editPost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.render("post-edit_view", { post });
};

const editPostLogic = async (req, res) => {
    await Post.findByIdAndUpdate(req.params.postId, req.body).save();
    res.redirect("/");
};

const repost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    res.render("repost_view", { post });
};

const savePost = async (req, res) => {
    const savePost = await Post.findById(req.params.postId);
    const user = await User.findById(res.locals.currentUser.id);
    user.savedPost.push(savePost.id);
    savePost.isSaved = true;
    await savePost.save();
    await user.save();
};

const unsavePost = async (req, res) => {
    const unsavePost = await Post.findById(req.params.postId);
    const user = await User.findById(res.locals.currentUser.id);
    user.savedPost = user.savedPost.filter((post) => post != unsavePost.id);
    unsavePost.isSaved = false;
    await unsavePost.save();
    await user.save();
};

const visabilityPost = async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if (post.isHidden) {
        post.isHidden = !post.isHidden;
    } else {
        post.isHidden = true;
    }
    await post.save();
};

const renderHiddenPost = async (req, res) => {
    const posts = await Post.find({
        $and: [{ onwer: res.locals.currentUser.id }, { isHidden: true }],
    })
        .populate("onwer")
        .populate("commentId")
        .populate({ path: "commentId", populate: "userId" });
    res.send(
        JSON.stringify({
            // in case of load error delete JSON
            msg: "success",
            posts: posts.reverse(),
        })
    );
};

const renderSavedPost = async (req, res) => {
    const user = await User.findById(res.locals.currentUser.id);
    const posts = await Post.find({ isSaved: true })
        .populate("onwer")
        .populate("commentId")
        .populate({ path: "commentId", populate: "userId" });
    console.log(posts)
    res.send(
        JSON.stringify({
            // in case of load error delete JSON
            msg: "success",
            posts: posts.reverse(),
        })
    );
};

const renderUserPosts = async (req, res) => {
    const user = await getUser(req.params.username);
    const posts = await Post.find({ onwer: user.id })
        .populate("onwer")
        .populate("commentId")
        .populate({ path: "commentId", populate: "userId" });
    res.send(
        JSON.stringify({
            // in case of load error delete JSON
            msg: "success",
            posts: posts.reverse(),
        })
    );
};

const deleteComment = async (req, res) => {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    let post = await Post.findById(comment.postId);
    post.commentId = post.commentId.filter(
        (commentId) => commentId != comment.id
    );
    post.comments = post.commentId.length;
    post.save();
    res.send({ comments: post.comments });
};

const deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.postId);
};
function getUser(username) {
    return User.findOne({ username });
}

export default {
    loadPosts,
    loadTrending,
    renderIndex,
    renderIndex,
    createPost,
    likePost,
    commentPost,
    editPost,
    editPostLogic,
    repost,
    savePost,
    unsavePost,
    visabilityPost,
    renderHiddenPost,
    renderSavedPost,
    renderUserPosts,
    deleteComment,
    deletePost,
};
