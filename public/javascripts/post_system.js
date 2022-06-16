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
                   <div class="dropdown">
                        <button class="btn border-0 btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            ${USER == post.onwer._id 
                                ? /*html*/`
                                    <li><button class="dropdown-item" id="edit-post">Edit</button></li>
                                    <li><button class="dropdown-item" id="visability-post">Hide</button></li>
                                    <li><button class="dropdown-item" id="delete-post">Delete</button></li>`
                                : /*html*/ `
                                    <li><button class="dropdown-item" id="repost">Re-post</button></li>
                                    <li><button class="dropdown-item" id="save-post">Save</button></li>`
                            }
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">${post.post}</p>
                </div>
                <div class="card-text">
                    <span class="like-container" style="color:${post.color}">like <small class="like-counter">${post.likes}</small></span>
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
        .then((data) => {
            renderPosts(data);
        });
};

$('body').on('click', '#delete-post', function (e) {
    e.preventDefault();
    const post = $(this).closest('.card')
    if(confirm('Are you sure, you want to delete this post?')) {
        post.remove();
        fetch(`${APP_URL}delete-post/${post.data('id')}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then((data) => {console.log(data)})
        .catch((er) => console.log(er))
    }

})

export { getPosts };