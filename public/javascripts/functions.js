import { postModal } from "./post_system.js";

const ajaxCall = (param1, param2, action) => {
    fetch(`${APP_URL}${param1}/${param2}`, {
        method: action,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if(param1 == 'post'){
                postModal(data)
            }
        })
        .catch((er) => console.log(er));
};

export { ajaxCall }