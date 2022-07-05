import { ajaxCall } from "./functions.js";

const renderPosts = (data, where) => {
    let load = "";
    for (let post of data.posts) {
        load = /*html*/ `
            <div class="card card-container m-3 w-100" data-id="${post._id}">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        ${post.onwer.firstname} ${post.onwer.surname}
                        <a href="${post.onwer.username}" class="link-dark" >@${
            post.onwer.username
        }</a>
                        <!-- if is re-post-->
                        <p class="fs-6 fw-light">
                            ${
                                post.repost
                                    ? `posted by ${post.repost.username}`
                                    : ""
                            }
                        </p>
                    </div>
                   <div class="dropdown">
                        <button class="btn border-0 btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            ${
                                USER == post.onwer._id
                                    ? /*html*/ `
                                <li><a class="dropdown-item" id="edit-post" href="${APP_URL}edit-post/${post._id}">Edit</a></li>
                                <li><a class="dropdown-item" id="visability-post" href="#">Hide</a></li>
                                <li><a class="dropdown-item" id="delete-post" href="#">Delete</a></li>`
                                    : /*html*/ `
                                <li><a class="dropdown-item" id="repost" href="${APP_URL}repost/${post._id}">Re-post</a></li>
                                <li><a class="dropdown-item" id="save-post" href="#">Save</a></li>`
                            }
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="show-post" data-bs-target="#staticBackdrop">Go</button>
                    <h5 class="card-title"></h5>
                    <p class="card-text">${post.post}</p>
                </div>
                <div class="comment-section">
                    <div class="card-text">
                        <span id="like-container" style="color:${
                            post.color
                        }">like <small class="like-counter">${
            post.likes
        }</small></span>
                        <span id="comment-container">comment <small class="comment-counter">${
                            post.comments
                        }</small></span>
                    </div>
                    <div class="card-footer text-center text-muted">
                        ${new Date(post.createdAt).toDateString()}
                    </div>
                    <div class="add-comment-container" style="display: none;">
                        <div class="comments">
                            ${renderComments(post)}
                        </div>
                        <input type='text' class="form-control comment-input" name="comment" placeholder="comment" required>
                        <input type='submit' class="btn btn-sm" id="add-comment">
                    </div>
                </div>
            </div>
        `;
        $(where).append(load);
    }
};

const renderComments = (post) => {
    let loadComment = "";
    for (const comment of post.commentId) {
        loadComment += /*html*/ `
        <div class="card w-100" style="font-size: .8rem" data-id="${
            comment._id
        }">
            <div class="card-header d-flex align-items-center justify-content-between">
                <div>
                    ${comment.userId.firstname} ${comment.userId.surname}
                    <a href="${comment.userId.username}" class="link-dark" >@${
            comment.userId.username
        }</a>
                </div>
                <div class="dropdown">
                    ${
                        USER == comment.userId._id
                            ? /*html*/ `
                            <button class="btn border-0 btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" id="delete-comment" href="#">Delete</a></li>
                            </ul>`
                            : /*html*/ ``
                    }
                </div>
            </div>
            <div class="card-body">
                <p class="card-text">${comment.body}</p>
            </div>
            <div class="card-footer text-center text-muted">
                ${new Date(comment.userId.createdAt).toDateString()}
            </div>
        </div>`;
    }
    return loadComment;
};

const postModal = (data) => {
    $('.modal-dialog').empty()
    let load = /*html*/ `
        <div class="card card-container m-3 w-100" data-id="">
            <div class="modal-content">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="card-header d-flex align-items-center justify-content-between" style="z-index:100">
                <div>${data.onwer.firstname} ${data.onwer.surname}
                <a href="${data.onwer.username}" class="link-dark" >@${data.onwer.username}</a>
                <!-- if is re-post-->
                <p class="fs-6 fw-light">
                    ${data.repost
                            ? `posted by ${data.repost.username}`
                            : ""
                    }
                </p>
                </div>
               <div class="dropdown">
                    <button class="btn border-0 btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    ${
                        USER == data.onwer._id
                            ? /*html*/ `
                        <li><a class="dropdown-item" id="edit-post" href="${APP_URL}edit-post/${data._id}">Edit</a></li>
                        <li><a class="dropdown-item" id="visability-post" href="#">Hide</a></li>
                        <li><a class="dropdown-item" id="delete-post" href="#">Delete</a></li>`
                            : /*html*/ `
                        <li><a class="dropdown-item" id="repost" href="${APP_URL}repost/${data._id}">Re-post</a></li>
                        <li><a class="dropdown-item" id="save-post" href="#">Save</a></li>`
                    }
                    </ul>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title"></h5>
                <p class="card-text">${data.post}</p>
            </div>
            <div class="comment-section">
                <div class="card-text">
                    <span id="like-container" style="color:${data.likes}">like <small class="like-counter">${data.likes}</small></span>
                    <span id="comment-container">comment <small class="comment-counter">${data.comments}</small></span>
                </div>
                <div class="card-footer text-center text-muted">
                    
                </div>
                <div class="add-comment-container" style="display: none;">
                    <div class="comments">
                        
                    </div>
                    <input type='text' class="form-control comment-input" name="comment" placeholder="comment" required>
                    <input type='submit' class="btn btn-sm" id="add-comment">
                </div>
            </div>
        </div>`
    ;
    $('.modal-dialog').append(load)
};

// get all posts
const getPosts = () => {
    fetch(`${APP_URL}load-posts`, {
        type: "GET",
    })
        .then((res) => res.json())
        .then((data) =>
            data.posts.length > 0
                ? renderPosts(data, ".posts-container")
                : $(".posts-container").html(data.posts)
        )
        .catch((er) => console.log(er));
};

// get uses's post
const getUserPosts = (userUrl) => {
    fetch(`${APP_URL}load-posts?user=${userUrl}`, {
        type: "GET",
    })
        .then((res) => res.json())
        .then((data) =>
            data.posts.length > 0
                ? renderPosts(data, ".actions-container")
                : $(".actions-container").html(data.posts)
        )
        .catch((er) => console.log(er));
};

// save post (not for the currentUser)
$("body").on("click", "#save-post", function () {
    const post = $(this).closest(".card");
    ajaxCall("save-post", post.data("id"), "GET");
});

// change visability (for the currentUser)
$("body").on("click", "#visability-post", function () {
    const post = $(this).closest(".card");
    ajaxCall("edit-post", post.data("id"), "GET");
});

// show post
$("body").on("click", "#show-post", function () {
    const post = $(this).closest(".card");
    ajaxCall("post", post.data("id"), "GET");
});

// delete post (for the currentUser)
$("body").on("click", "#delete-post", function (e) {
    e.preventDefault();
    const post = $(this).closest(".card");
    if (confirm("Are you sure, you want to delete this post?")) {
        post.remove();
        ajaxCall("delete-post", post.data("id"), "DELETE");
    }
});

export { getPosts, getUserPosts, ajaxCall, postModal };
