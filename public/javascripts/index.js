import "./functions.js";
import { getPosts, /*getUserPosts*/ } from "./post_system.js";
import { likePost } from "./like_system.js";
import { commentPost } from "./comment_system.js";
import { follow, unfollow } from "./follow_system.js";
import { getTrandingPosts } from "./trending_system.js";
import { searchForm, mentionSearch, selectUsers } from "./search_system.js";

if (typeof PAGE != "undefined") {
    // profileImage(currentUser.extra_info.avatar)
    if (PAGE != 'LOGIN' || PAGE != 'REGISTER') {
        searchForm();
    }
    // profileImage()
    switch (PAGE) {
        case "INDEX":
            mentionSearch();
            getPosts();
            likePost();
            commentPost();
            break;
        case "SHOW POST":
            likePost();
            commentPost();
            break;
        case "PROFILE":
            let userUrl = window.location.href.split("/");
            userUrl = userUrl[userUrl.length - 1];
            // getUserPosts(userUrl);
            // renderSavedPosts();
            likePost();
            commentPost();
            follow();
            unfollow();
            break;
        case "TRENDING":
            getTrandingPosts();
            commentPost();
            break;
        case "SETTINGS":

            break;
        case "MESSAGES":

            break;
        case "NEW MESSAGE":
            selectUsers();

            break;
        case "NOTIFICATIONS":

            break;
    }
}
