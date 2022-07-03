const ajaxCall = (param1, param2, action) => {
    fetch(`${APP_URL}${param1}/${param2}`, {
        method: action,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((er) => console.log(er));
};

export { ajaxCall };
