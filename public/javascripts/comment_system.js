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
        const post = $(this).closest('.card')
        let comment = post.find('.comment-input')
        if(comment.val() != ''){
            $.post(`${APP_URL}comment-post/${post.data('id')}`, {
                body: comment.val()
            })
                .then((data) => {
                    loadComment(data)
                    post.find('.comment-counter').html(data.comments);
                    comment.val('')
                })
                .catch((err) => console.log(err))
        }
    })
}

// delete comment (for the currentUser)
$("body").on("click", ".delete-comment", function () {
    const comment = $(this).closest(".card")
    const total_comment = comment.closest(".card-container").find(".comment-counter")
    if (confirm("Are you sure, you want to delete this post?")) {
        total_comment.html(total_comment.html() - 1)
        comment.remove();
        ajaxCall(`delete-comment/${comment.data("id")}`, "DELETE");
    }
});

export { commentPost }