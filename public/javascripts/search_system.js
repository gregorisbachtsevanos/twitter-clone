var selectedUser = [];

const searchForm = () => {
    $('#searchModal #searchInput').on('keyup', function (e) {
        if ($(this).val() == '' && e.keycode == 8) {
            // remove user from selection
            return
        }
        $('.search-result').empty();
        searchUser($(this).val(), '.search-result')
        $('.btn-close').click(() => $(this).val(''))
        if (e.which == 27)
            $(this).val('')
    })
}

$("body").on("click", ".select-chat-user", function (e) {
    let name = $(this).parent().find('.fullname').text()
    selectedUser.push(name)
    console.log(selectedUser)
    $('#searchInputChat').val('').focus()
    $('.search-result').empty()
    $('#add-chat-user').prop('disabled', false)
})

const selectUsers = () => {
    $('#searchInputChat').on('keyup', function (e) {
        if ($(this).val() == '' && e.keycode == 8) {
            // remove user from selection
            return
        }
        $('.search-result').empty();
        searchUser($(this).val(), '.search-result', true)
        $('.btn-close').click(() => $(this).val(''))
        if (e.which == 27)
            $(this).val('')
    })
}

const mentionSearch = () => {
    $('#floatingTextarea').on('keyup', function (e) {
        console.log($(this).val())
        if (e.which == 50) {
            // $('.mention-result').empty();
            searchUser($(this).val(), '.mention-result')
            // $('.btn-close').click(() => $(this).val(''))
            // if(e.which == 27)
            //     $(this).val('')
        }
    })
}

const searchResults = (data, where, forChat) => {
    let load = '';
    for (let result of data) {
        if (result._id != USER) {
            load += /*html*/ `
                <div class="modal-body d-flex align-items-center " id="searchM">
                    <a
                    
                        class="nav-link w-25 "
                        aria-current="page"
                        href="${result.username}"
                    >
                        ${(result.extra_info.avatar)
                    ? /*html*/
                    `<img
                        class="card-img-top rounded-circle"
                        src="/uploads/images/${result.extra_info.avatar}"
                        alt="avatar"
                        style="width:100px;height:100px;"
                    />`
                    : /*html*/
                    `<p style="height:6.4rem;width:6.4rem;font-size:2.5rem" class="mt-2 d-flex justify-content-center align-items-center border rounded-circle bg-dark text-white">
                        ${result.username.charAt(0).toUpperCase()}
                    </p>`
                }
                    </a>
                    <span class="fullname">${result.firstname} ${result.surname}</span>
                    ${forChat ? `<span class="select-chat-user">@${result.username}</span>` : `<a href="${result.username}" class="link-dark" >@${result.username}</a>`}
                    
            </div>
            <hr class="w-100">`;
        }
    }
    $(where).append(load)
}

const searchUser = (value, where, forChat = false) => {
    $.post(`${APP_URL}search`, {
        search: value
    })
        .then(data => searchResults(data.users, where, forChat))
        .catch(err => console.log(err))
}

export { searchForm, mentionSearch, selectUsers }