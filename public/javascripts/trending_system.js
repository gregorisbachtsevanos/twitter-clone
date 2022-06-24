const renderTrending = () => {
    let load = "";
    for (let post of data.posts) {
        load += /*html*/`
        <div class="card card-container m-3 w-100" data-id="${post._id}">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        ${post.onwer.firstname} ${post.onwer.surname}
                        <a href="${post.onwer.username}" class="link-dark" >@${post.onwer.username}</a>
                        <p class="fs-6 fw-light">
                            ${post.repost
                                ? `posted by ${post.repost.username}`
                                : ""
                            }
                        </p>
                    </div>
                   <div class="dropdown">
                        <button class="btn border-0 btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            ${USER == post.onwer._id
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
                <div class="comment-section">
                    <div class="card-text">
                        <span id="like-container" style="color:${post.color}">like <small class="like-counter">${post.likes}</small></span>
                        <span id="comment-container">comment <small class="comment-counter">${post.comments}</small></span>
                    </div>
                    <div class="card-footer text-center text-muted">
                        ${new Date(post.createdAt).toDateString()}
                    </div>
                    <div class="add-comment-container" style="display: none;">
                        <div class="comments">
                        </div>
                        <input type='text' class="form-control comment-input" name="comment" placeholder="comment" required>
                        <input type='submit' class="btn btn-sm" id="add-comment">
                    </div>
                </div>
            </div>`
    }
}

const getTrandingPosts = () => {
    fetch(`${APP_URL}trending`, {
    type: "GET",
})
    // .then((res) => res.json())
    // .then((data) => data.posts.length > 0 ? renderTrending(data, ".trending-container") : $('.trending-container').html(data.posts))
    .then((data) => console.log(data))
    .catch((er) => console.log(er));
}

export { getTrandingPosts }