import { renderSavedPosts } from "./saved-posts_system.js";
import { renderHiddenPosts } from "./hidden-posts_system.js";
import { renderUserPosts } from "./user-posts_system.js";

const profileImage = (avatar, username, size) => {
    if (avatar){
        return /*html*/ `<img
            class="card-img-top rounded-circle"
            src="/uploads/images/${USER_AVATAR}"
            alt="avatar"
            style="width:${size};height:${size};"
        />`
    } else {
        return /*html*/ `<p style="height:10rem;width:10rem;font-size:4.5rem" class="mt-2 d-flex justify-content-center align-items-center border rounded-circle bg-dark text-white">
            ${ username.charAt(0).toUpperCase() }
        </p>`
    }
}

// nav-item
// $('.avatar-container').html(profileImage(USER_AVATAR, USER_USERNAME, '220px' ))
$('.avatar-container-nav').html(profileImage(USER_AVATAR, USER_USERNAME, '100px' ))


const ajaxCall = (param, action) => {
    // console.log(param);
    fetch(`${APP_URL}${param}`, {
        method: action,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            if(PAGE == 'PROFILE'){
                if(param.includes('saved-posts')){
                    renderSavedPosts(data, $('.actions-container'))
                }else if (param.includes('user-posts')){
                    renderUserPosts(data, $('.actions-container'))
                }
                else if (param.includes('hidden-posts')){
                    renderHiddenPosts(data, $('.actions-container'))
                }
            }
        })
        .catch((er) => console.log(er));
};

export { ajaxCall };