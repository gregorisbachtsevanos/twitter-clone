const commentPost = () => {
    $('body').on('click', '#comment-container', function () {
        const post = $(this).closest('.card')
        const data = $('.comment-input').val()
        $.post(`${APP_URL}comment-post/${post.data('id')}`, {
            comment: data
        })
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    })
}

export { commentPost }