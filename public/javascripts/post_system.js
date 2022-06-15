const renderPosts = (data) => {
    let load = "";
    for (let post of data.posts) {
        load += /*html*/ `
        
            <div class="card m-3 w-100" data-id="${post._id}">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        ${post.onwer.firstname} ${post.onwer.surname}
                        <small>@${post.onwer.username}</small>
                    </div>
                    ${USER == post.onwer._id 
                        ? /*html*/
                        `<div class="dropstart">
                            <button class="btn border-0 btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                x
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>`
                        : /*html*/ ``}
                </div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">${post.post}</p>
                </div>
                <div class="card-text">
                    <span class="like-container" style="color:${post.color}">like <small class="like-counter">${post.likes}</small></span>
                    <span class="comment-container">comment <small class="like-counter">${post.comments}</small></span>
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
