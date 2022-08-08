import { getPosts, /*getUserPosts*/ } from "./post_system.js";
import { likePost } from "./like_system.js";
import { commentPost } from "./comment_system.js";
import { follow, unfollow } from "./follow_system.js";
import { getTrandingPosts } from "./trending_system.js";
import { searchForm, mentionSearch } from "./search_system.js";
import { renderSavedPosts } from "./saved-posts_system.js";

if (typeof PAGE != "undefined") {
    switch (PAGE) {
        case "INDEX":
            mentionSearch();
            searchForm();
            getPosts();
            likePost();
            commentPost();
            break;
        case "SHOW POST":
            searchForm();
            likePost();
            commentPost();
            break;
        case "PROFILE":
            let userUrl = window.location.href.split("/");
            userUrl = userUrl[userUrl.length - 1];
            searchForm();
            // getUserPosts(userUrl);
            // renderSavedPosts();
            likePost();
            commentPost();
            follow();
            unfollow();
            break;
        case "TRENDING":
            searchForm();
            getTrandingPosts();
            commentPost();
            break;
    }
}
