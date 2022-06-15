const renderPosts = (data) => {
    let load = "";
    for (let post of data.posts) {
        load += /*html*/ `
            <div class="card m-3" data-id="${post._id}">
                <div class="card-header">
                    ${post.onwer.firstname} ${post.onwer.surname}
                    <small>@${post.onwer.username}</small>
                    <small>
                    ${ (USER == post.onwer._id)
                        ? /*html*/
                        `x`
                        : /*html*/
                        ``
                    }
                    </small>
                </div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">${post.post}</p>
                </div>
                <div class="card-text">
                    <span class="like-post">like ${post.likes} </span>
                    <span class="comment-post">comment</span>
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
    .then((data) => {
        renderPosts(data);
    });
};

export { getPosts };
