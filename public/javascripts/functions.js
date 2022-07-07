import { postModal } from "./post_system.js";
import { renderSavedPosts } from "./saved-posts_system.js";

const ajaxCall = (param, action) => {
    fetch(`${APP_URL}${param}`, {
        method: action,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if(PAGE == 'INDEX'){
                postModal(data)
                // console.log(data)
            }else if(PAGE == 'PROFILE'){
                renderSavedPosts(data, $('.actions-container'))
            }
        })
        .catch((er) => console.log(er));
};

export { ajaxCall };
