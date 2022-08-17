import { ajaxCall } from "./functions.js";

const renderUserPosts = (data, where) => {
    // console.log(data)
    let load = "";
    for (let post of data.posts) {
        load = /*html*/ `
            <div class="card card-container m-3 w-100" data-id="${post._id}">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        ${post.onwer.firstname} ${post.onwer.surname}
                        <a href="/${post.onwer.username}" class="link-dark" >@${
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
                        <button class="btn border-0 btn-sm dropdown-toggle" type="button" class="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            ${
                                USER == post.onwer._id
                                    ? /*html*/ `
                                <li><a class="dropdown-item" id="edit-post" href="${APP_URL}edit-post/${post._id}">Edit</a></li>
                                <li><a class="dropdown-item" id="visability-post" href="#">Hide</a></li>
                                <li><a class="dropdown-item" id="delete-post" href="#">Delete</a></li>`
                                    : /*html*/ `
                                <li><a class="dropdown-item" id="repost" href="${APP_URL}repost/${
                                          post._id
                                      }">Re-post</a></li>
                                <li><a class="dropdown-item" id="${
                                    post.isSaved ? "unsave-post" : "save-post"
                                }" href="#">${
                                          post.isSaved ? "Unsave" : "Save"
                                      }</a></li>`
                            }
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">${post.post}</p>
                </div>
                <div class="comment-section">
                    <div class="card-text">
                        <span class="like-container" style="color:${
                            post.color
                        }">like <small class="like-counter">${
            post.likes
        }</small></span>
                        <span class="comment-container">comment <small class="comment-counter">${
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
                        <input type='submit' class="btn btn-sm add-comment">
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
        // console.log(comment)
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
                            <button class="btn border-0 btn-sm dropdown-toggle" type="button" class="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item delete-comment" href="#">Delete</a></li>
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

$("body").on("click", "#user_posts", function () {
    ($(".actions-container").empty())
    let userUrl = window.location.href.split("/");
    userUrl = userUrl[userUrl.length - 1];
    ajaxCall(`user-posts/${userUrl}`, "GET");
});

export { renderUserPosts };