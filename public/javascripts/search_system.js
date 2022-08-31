import { selectedUsers } from './chat_system.js'

// var selectedUsers = [];

const searchForm = () => {
    $('#searchModal #searchInput').on('keyup', function (e) {
        if ($(this).val() == '' && e.keycode == 8) {
            selectedUsers
            return
        }
        $('.search-result').empty();
        searchUser($(this).val(), '.search-result')
        $('.btn-close').click(() => $(this).val(''))
        if (e.which == 27)
            $(this).val('')
    })
}

// $("body").on("click", ".select-chat-user", function (e) {
//     let name = $(this).parent().find('.fullname').text()
//     selectedUsers.push(name)
//     console.log(selectedUsers)
//     selectedUsersDisplay()
//     $('#searchInputChat').val('').focus()
//     $('.search-result').empty()
//     $('#add-chat-user').prop('disabled', false)
// })

// const selectUsers = () => {
//     $('#searchInputChat').on('keydown', function (e) {
//         if ($(this).val() == '' && e.which == 8) {
//             selectedUsers.pop()
//             $('.search-result').empty()
//             selectedUsersDisplay()
//             if (selectedUsers.length == 0) {
//                 $('#add-chat-user').prop('disabled', true)
//             }
//         }
//         $('.search-result').empty();
//         searchUser($(this).val(), '.search-result', true)
//         $('.btn-close').click(() => $(this).val(''))
//         if (e.which == 27)
//             $(this).val('')
//     })
// }

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

const selectedUsersDisplay = () => {
    $(".appended-users").remove()
    $("#searchForChatUsers").prepend(`<span class="appended-users border border-3 rounded p-1">${selectedUsers.join(' ')}</span`)
}

const searchResults = (data, where, forChat) => {
    let load = '';
    for (let result of data) {
        if (result._id != USER) {
            if (selectedUsers.some(u => u == `${result.firstname} ${result.surname}`)) {
                void (0)
            } else {
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
                    <span class="fullname" data-username="${result.username}">${result.firstname} ${result.surname}</span>
                    ${forChat
                        ? `<span class="select-chat-user">@${result.username}</span>`
                        : `<a href="${result.username}" class="link-dark" >@${result.username}</a>`}
                    
            </div >
    <hr class="w-100">`;
            }
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

export { searchForm, mentionSearch, searchUser }