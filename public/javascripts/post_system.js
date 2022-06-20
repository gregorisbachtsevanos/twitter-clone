const renderPosts = (data, where) => {
    let load = "";
    for (let post of data.posts) {
        load = /*html*/ `
            <div class="card card-container m-3 w-100" data-id="${post._id}">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        ${post.onwer.firstname} ${post.onwer.surname}
                        <a href="${post.onwer.username}" class="link-dark" >@${post.onwer.username}</a>
                        <p class="fs-6 fw-light">${
                            post.repost
                                ? `posted by ${post.repost.username}`
                                : ""
                        }</p>
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
                    <h5 class="card-title"></h5>
                    <p class="card-text">${post.post}</p>
                </div>
                <div class="card-text">
                    <span id="like-container" style="color:${post.color}">like <small class="like-counter">${post.likes}</small></span>
                    <span id="comment-container">comment <small class="comment-counter">${post.comments}</small></span>
                        
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
            </form>
        `;
        $(where).append(load);
    }
};

const renderComments = (post) => {
    let loadComment = "";
    for (const comment of post.commentId) {
        loadComment += /*html*/ `
        <div class="card w-100" style="font-size: .8rem" data-id="${comment._id}">
            <div class="card-header d-flex align-items-center justify-content-between">
                <div>
                    ${comment.userId.firstname} ${comment.userId.surname}
                    <a href="${comment.userId.username}" class="link-dark" >@${comment.userId.username}</a>
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

const getPosts = () => {
    fetch(`${APP_URL}load-posts`, {
        type: "GET",
    })
        .then((res) => res.json())
        .then((data) => renderPosts(data, ".posts-container"))
        .catch((er) => console.log(er));
};

const getUserPosts = (USER) => {
    fetch(`${APP_URL}load-posts?user=${USER}`, {
        type: "GET",
    })
        .then((res) => res.json())
        .then((data) => renderPosts(data, ".actions-container"))
        .catch((er) => console.log(er));
};

const ajaxCall = (path, post, action) => {
    fetch(`${APP_URL}${path}/${post.data("id")}`, {
        method: action,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if(path == 'delete-comment'){
                console.log(data.comments)
                post.closest(".card-container").find(".comment-counter").html(data.comments)
            }
        })
        .catch((er) => console.log(er));
};

// save post (not for the currentUser)
$("body").on("click", "#save-post", function () {
    const post = $(this).closest(".card");
    ajaxCall("save-post", post, "GET");
});

// change visability (for the currentUser)
$("body").on("click", "#visability-post", function () {
    const post = $(this).closest(".card");
    ajaxCall("edit-post", post, "GET");
});

// delete post (for the currentUser)
$("body").on("click", "#delete-post", function (e) {
    e.preventDefault();
    const post = $(this).closest(".card");
    if (confirm("Are you sure, you want to delete this post?")) {
        post.remove();
        ajaxCall("delete-post", post, "DELETE");
    }
});

// delete comment (for the currentUser)
$("body").on("click", "#delete-comment", function (e) {
    e.preventDefault();
    const comment = $(this).closest(".card")
    // console.log(comment.closest(".card-container").find(".comment-counter").html(4));
    if (confirm("Are you sure, you want to delete this post?")) {
        comment.remove();
        ajaxCall("delete-comment", comment, "DELETE");
    }
});

export {getPosts, getUserPosts };
