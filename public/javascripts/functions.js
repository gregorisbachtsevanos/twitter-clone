import { renderSavedPosts } from "./saved-posts_system.js";
import { renderHiddenPosts } from "./hidden-posts_system.js";
import { renderUserPosts } from "./user-posts_system.js";

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