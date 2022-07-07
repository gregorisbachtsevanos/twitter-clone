const searchForm = () => {
    $('#searchModal #searchInput').on('keyup', function (e) {
        $('.search-result').empty();
        searchUser($(this).val())
        $('.btn-close').click(() => $(this).val(''))
        if(e.which == 27)
            $(this).val('')
    })
}

const searchResults = (data) => {
    let load = '';
    for(let result of data){
        if(result._id != USER){
            load += /*html*/ `
                <div class="modal-body d-flex align-items-center " id="searchM">
                    <a
                        class="nav-link w-25 "
                        aria-current="page"
                        href="${result.username}"
                    >
                        ${(!result.extra_info.avatar) ? /*html*/
                            `<img src="/images/avatars/avatarImage.png"
                                alt="avatar"
                                height="100%"
                                width="50%" />`
                        : /*html*/
                            `<p class="h1 text-dark">${result.username.charAt(0).toUpperCase()}</p>`
                        }
                    </a>
                    ${result.firstname} ${result.surname}
                    <a href="${result.username}" class="link-dark" >@${result.username}</a>
            </div>
            <hr class="w-100">`;
        }
    }
    $('.search-result').append(load)
}

const searchUser = (value) => {
    $.post(`${APP_URL}search`, {
        search: value
    })
    .then(data => searchResults(data.users))
    .catch(err => console.log(err))
}

export { searchForm }