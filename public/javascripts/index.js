import "./functions.js";
import { getPosts, /*getUserPosts*/ } from "./post_system.js";
import { likePost } from "./like_system.js";
import { commentPost } from "./comment_system.js";
import { follow, unfollow } from "./follow_system.js";
import { getTrandingPosts } from "./trending_system.js";
import { searchForm, mentionSearch } from "./search_system.js";

if (typeof PAGE != "undefined") {
    // profileImage(currentUser.extra_info.avatar)
    // profileImage()
    const profileImage = (avatar, username) => {
        console.log(avatar)
        var pic = ''
        if (avatar){
            /*html*/
            pic =`<img
                class="card-img-top rounded-circle"
                src="/images/avatars/avatarImage.png"
                alt="avatar"
                height="100%"
                width="100%"
            />`
        } else {
            /*html*/
            pic = `<p style="height:10rem;width:10rem;font-size:4.5rem" class="mt-2 d-flex justify-content-center align-items-center border rounded-circle bg-dark text-white">
                 ${username.charAt(0).toUpperCase() }
            </p>`
        }
        return pic;
    }
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
