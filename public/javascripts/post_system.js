const renderPosts = (data) => {
    let load = "";
    for (let post of data.posts) {
        load += /*html*/ `
            <div class="card m-3 w-100" data-id="${post._id}">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        ${post.onwer.firstname} ${post.onwer.surname}
                        <small>@${post.onwer.username}</small>
                        <p class="fs-6 fw-light">${post.repost ? `posted by ${post.repost.username}`:'' }</p>
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
                <div class="card-text">
                    <span id="like-container" style="color:${post.color}">like <small class="like-counter">${post.likes}</small></span>
                    <span class="comment-container">comment <small class="comment-counter">${post.comments}</small></span>
                </div>
                <div class="card-footer text-center text-muted">
                    ${new Date(post.createdAt).toDateString()}
                </div>
            </div>
        `;
    }
    $(".posts-container").append(load);
};

const getPosts = () => {
    fetch(`${APP_URL}load-posts`, {
        type: "GET",
    })
        .then((res) => res.json())
        .then((data) => renderPosts(data))
        .catch((er) => console.log(er));
};

const ajaxCall = (path, post, action) => {
    fetch(`${APP_URL}${path}/${post.data('id')}`, {
        method: action,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then((data) => { console.log(data); })
        .catch((er) => console.log(er));
}

// save post (not for the currentUser)
$('body').on('click', '#save-post', function () {
    const post = $(this).closest('.card')
    ajaxCall('save-post', post, 'GET');
})

// repost (not for the currentUser)
// $('body').on('click', '#repost', function (e) {
//     e.preventDefault()
//     const post = $(this).closest('.card')
//         ajaxCall('repost', post, 'POST');
// })

// change visability (for the currentUser)
$('body').on('click', '#visability-post', function () {
    const post = $(this).closest('.card')
    ajaxCall('edit-post', post, 'GET');
})

// delete post (for the currentUser)
$('body').on('click', '#delete-post', function (e) {
    e.preventDefault()
    const post = $(this).closest('.card')
    if(confirm('Are you sure, you want to delete this post?')) {
        post.remove();
        ajaxCall('delete-post', post, 'DELETE');
    }
})

export { getPosts };


