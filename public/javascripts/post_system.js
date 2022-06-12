const renderPosts = (data) => {
    let load = "";
    for (let post of data.posts) {
        load += /*html*/ `
            <div class="card m-3">
                <div class="card-header">
                    ${post.userId.firstname} ${post.userId.surname}
                    <small>@${post.userId.username}</small>
                    <small>
                    ${ (USER == post.userId._id)
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
                    <span class="like">like</span>
                    <span class="comment">comment</span>
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
