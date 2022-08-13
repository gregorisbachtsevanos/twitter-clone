import { ajaxCall } from './functions.js'

const loadComment = (data) => {
    let load = '';
    load += /*html*/ `
        <div class="card w-100" style="font-size: .8rem" data-id="${data.body._id}">
            <div class="card-header d-flex align-items-center justify-content-between">
                <div>
                    ${data.body.userId.firstname} ${data.body.userId.surname}
                    <a href="${data.body.userId.username}" class="link-dark" >@${data.body.userId.username}</a>
                </div>
                <div class="dropdown">
                    ${
                    USER == data.body.userId._id
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
                <h5 class="card-title"></h5>
                <p class="card-text">${data.body.body}</p>
            </div>
            
            <div class="card-footer text-center text-muted">
                ${new Date(data.body.createdAt).toDateString()}
            </div>
        </div>`
    $('.comments').append(load);
}

// toggle comments
$('body').on('click', '.comment-container', (e) => $(e.target).closest('.comment-section').find('.add-comment-container').slideToggle());

// add comments
const commentPost = () => {
    $('body').on('click', '.add-comment', function () {
        if(PAGE == "INDEX"){
            var post = $(this).closest('.card')
        }else if(PAGE == "SHOW POST"){
            var post = $(this).closest('.comment-container')           
        }
        var comment = post.find('.comment-input')
        if(comment.val() != ''){
            $.post(`${APP_URL}comment-post/${post.data('id')}`, {
                body: comment.val()
            })
                .then((data) => {
                    if(PAGE == "INDEX"){
                        loadComment(data)
                    }else if(PAGE == "SHOW POST"){
                        commentTemplate(data.body)
                    }
                    post.find('.comment-counter').html(data.comments);
                    comment.val('')
                })
                .catch((err) => console.log(err))
        }
    })
}

// comment template
const commentTemplate = (comment) => {
    const load = /*html*/
        `<div
            class="card w-100 my-1"
            style="font-size: 0.8rem"
            data-id='${comment._id}'
        >
        <div
            class="card-header d-flex align-items-center justify-content-between"
        >
            <div>
                ${comment.userId.firstname}
                ${comment.userId.surname}
                <a
                    href="<%=comment.userId.username%>"
                    class="link-dark"
                    >@${comment.userId.username}</a
                >
            </div>
            <div class="dropdown">
                ${(USER == comment.userId._id)
                    ? /*html*/
                        `<button
                            class="btn border-0 btn-sm dropdown-toggle"
                            type="button"
                            class="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        ></button>
                        <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                        >
                            <li>
                                <a
                                    class="dropdown-item delete-comment"
                                    href="#"
                                    >Delete</a
                                >
                            </li>
                        </ul>`
                    :''}
            </div>
        </div>
        <div class="card-body">
            <p class="card-text">${comment.body}</p>
        </div>
        <div class="card-footer text-center text-muted">
            ${new Date(comment.userId.createdAt).toDateString()}
        </div>
    </div>`
    $('.comments').append(load);
}

// delete comment (for the currentUser)
$("body").on("click", ".delete-comment", function () {
    const comment = $(this).closest(".card")
    const total_comment = comment.closest(".card-container").find(".comment-counter")
    if (confirm("Are you sure, you want to delete this post?")) {
        $('.comment-counter').html($('.comment-counter').html() - 1)
        total_comment.html(total_comment.html() - 1)
        comment.remove();
        ajaxCall(`delete-comment/${comment.data("id")}`, "DELETE");
    }
});

export { commentPost }