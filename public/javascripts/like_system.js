const likePost = () => {
    $("body").on("click", ".like-post", function () {
        const post = $(this).closest(".card");
        // console.log(post.data('id'))
        fetch(`${APP_URL}like-post/${post.data("id")}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    });
};

export { likePost };