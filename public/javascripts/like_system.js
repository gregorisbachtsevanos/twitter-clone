const likePost = () => {
    $("body").on("click", ".like-container", function () {
        const post = $(this).closest(".card");
        fetch(`${APP_URL}like-post/${post.data("id")}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                post.find(".like-counter").html(data.like);
                post.find(".like-container").css({
                    color: data.color,
                    transform: "scale(1.1)",
                    "font-weight": "700",
                });
                setTimeout(() => {
                    post.find(".like-container").css({
                        transform: "scale(1)",
                        "font-weight": "350",
                    });
                }, 70);
            })
            .catch((err) => console.log(err));
    });
};

export { likePost };
