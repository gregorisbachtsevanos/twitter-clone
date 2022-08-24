import { ajaxCall } from "./functions.js";

const renderPosts = (data, where) => {
    let load = "";
    for (let post of data.posts) {
        // let body = post.hasHashtag ? post.post.indexOf('#') : void(0);
        var body = attributeTag(post); // check if has hashtag or mention
        load = /*html*/ `
            <div class="card card-container m-3 w-100" data-id="${post._id}">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <div>
                        ${post.onwer.firstname} ${post.onwer.surname}
                        <a href="/${post.onwer.username}" class="link-dark" >@${post.onwer.username}</a>
                        <!-- if is re-post-->
                        <p class="fs-6 fw-light">
                            ${post.repost
                ? `posted by ${post.repost.username}`
                : ""
            }
                        </p>
                    </div>
                   <div class="dropdown">
                        <button class="btn border-0 btn-sm dropdown-toggle" type="button" class="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            ${USER == post.onwer._id
                ? /*html*/ `
                                    <li><a class="dropdown-item" id="edit-post" href="${APP_URL}edit-post/${post._id}">Edit</a></li>
                                    <li><p class="dropdown-item" id="${post.isHidden ? 'public-post' : 'private-post'}">${post.isHidden ? 'Public' : 'Private'}</p></li>
                                    <li><a class="dropdown-item" id="delete-post" href="#">Delete</a></li>`
                : /*html*/ `
                                    <li><a class="dropdown-item" id="repost" href="${APP_URL}repost/${post._id}">Re-post</a></li>
                                    <li><a class="dropdown-item" id="${post.isSaved ? 'unsave-post' : 'save-post'}" href="#">${post.isSaved ? 'Unsave' : 'Save'}</a></li>`
            }
                        </ul>
                    </div>
                </div>
                <a href="post/${post._id}">Go</a>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    ${post.post ? /*html*/`<p class="card-text">${post.hasHashtag || post.hasMention ? body.join(" ") : post.post}</p>` : ''}
                    ${post.image ? /*html*/ `<img src="/uploads/images/${post.image}" class="card-img-top">` : ''}
                </div>
                <div class="comment-section">
                    <div class="card-text px-2">
                        <span class="like-container" style="color:${post.color}">like <small class="like-counter">${post.likes}</small></span>
                        <span class="comment-container">comment <small class="comment-counter">${post.comments}</small></span>
                    </div>
                    <div class="card-footer text-center text-muted">
                        ${new Date(post.createdAt).toDateString()}
                    </div>
                    <div class="add-comment-container" style="display: none;">
                        <div class="comments">
                         <div class="comments">
                            ${renderComments(post)}
                        </div>
                        </div>
                        <input type='text' class="form-control comment-input" name="comment" placeholder="comment" required>
                        <input type='submit' class="btn btn-sm add-comment">
                    </div>
                </div>
            </div>
        `;
        $(where).append(load);
    }

    function attributeTag(post) {
        if (post.hasMention) {
            var body = post.hasMention
                ? post.post.split(" ")
                : post.post;
            var i = 0;
            while (i < body.length) {
                if (body[i].includes('@')) {
                    body[i] = `<a href="${body[i].replace('@', '')}" class="mention">${body[i]}</a>`;
                }
                i++;
            }
        }
        if (post.hasHashtag) {
            var body = post.hasHashtag
                ? post.post.split(" ")
                : post.post;
            var i = 0;
            while (i < body.length) {
                if (body[i].includes('#')) {
                    body[i] = `<span class="hashtag">${body[i]}</span>`;
                }
                i++;
            }
        }
        return body;
    }


};

const renderComments = (post) => {
    let loadComment = "";
    // console.log(post)
    for (const comment of post.commentId) {
        loadComment += /*html*/ `
        <div class="card w-100" style="font-size: .8rem" data-id="${comment._id
            }">
            <div class="card-header d-flex align-items-center justify-content-between">
                <div>
                    ${comment.userId.firstname} ${comment.userId.surname}
                    <a href="${comment.userId.username}" class="link-dark" >@${comment.userId.username
            }</a>
                </div>
                <div class="dropdown">
                    ${USER == comment.userId._id
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

// get all posts
const getPosts = () => {
    fetch(`${APP_URL}load-posts`, {
        type: "GET",
    })
        .then((res) => res.json())
        .then((data) =>
            data.posts.length > 0
                ? renderPosts(data, ".posts-container")
                : (($(".posts-container").empty())($(".posts-container").html(data.posts)))
        )
        .catch((er) => console.log(er));
};

// get uses's post
// const getUserPosts = (userUrl) => {
// fetch(`${APP_URL}load-posts?user=${userUrl}`, {
//     type: "GET",
// })
//     .then((res) => res.json())
//     .then((data) =>
//         data.posts.length > 0
//             ? renderPosts(data, ".actions-container")
//             : ((($(".actions-container").empty()))($(".actions-container").html(data.posts)))
//     )
//     .catch((er) => console.log(er));
// };

// save - unsave post (not for the currentUser)
$("body").on("click", "#save-post", function () {
    $(this).closest(".dropdown-menu").find("#save-post").attr('id', 'unsave-post').html('Unsave');
})

$("body").on("click", "#save-post", function () {
    const post = $(this).closest(".card");
    ajaxCall(`save-post/${post.data("id")}`, "GET");
})

$("body").on("click", "#unsave-post", function () {
    $(this).closest(".dropdown-menu").find("#unsave-post").attr('id', 'save-post').html('Save');
})

$("body").on("click", "#unsave-post", function () {
    const post = $(this).closest(".card");
    // ajaxCall("Save-Post", post.data("id"), "GET");
    ajaxCall(`unsave-post/${post.data("id")}`, "GET");
})

// change visability (for the currentUser)
// $("body").on("click", "#visability-post", function () {
//     console.log($(this).data('value'))
//         if($(this).data('value') == 'public'){
//             $(this).removeAttr('data-value')
//             $(this).attr('data-value', 'private')
//             $(this).html('Private')
//         }else{
//             $(this).removeAttr('data-value')
//             $(this).attr('data-value', 'public')
//             $(this).html('Public')
//         }
//     // $(this).closest(".dropdown-menu").find("#unsave-post").attr('id', 'save-post').html('Save');
// })

// $("body").on("click", "#visability-post", function () {
//     const post = $(this).closest(".card");
//     ajaxCall(`visability-post/${post.data("id")}`, "GET");
// });

$("body").on("click", "#public-post", function () {
    $(this).closest(".dropdown-menu").find("#public-post").attr('id', 'private-post').html('Private');
})

$("body").on("click", "#public-post", function () {
    const post = $(this).closest(".card");
    ajaxCall(`visability-post/${post.data("id")}`, "POST");
    // // fetch(`${APP_URL}visability-post/${post.data("id")}`, {
    // //     method: "POST",
    // //     headers: {
    // //         Accept: "application/json",
    // //         "Content-Type": "application/json",
    // //     },
    // })
})

$("body").on("click", "#private-post", function () {
    $(this).closest(".dropdown-menu").find("#private-post").attr('id', 'public-post').html('Public');
})

$("body").on("click", "#private-post", function () {
    const post = $(this).closest(".card");
    ajaxCall(`visability-post/${post.data("id")}`, "POST");
    // fetch(`${APP_URL}visability-post/${post.data("id")}`, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //     },
    // })
})

// delete post (for the currentUser)
$("body").on("click", "#delete-post", function (e) {
    e.preventDefault();
    const post = $(this).closest(".card");
    if (confirm("Are you sure, you want to delete this post?")) {
        post.remove();
        ajaxCall(`delete-post/${post.data("id")}`, "DELETE");
    }
});

export { getPosts, /*getUserPosts,*/ ajaxCall };
