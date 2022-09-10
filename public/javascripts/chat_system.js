import { searchUser } from './search_system.js'
var selectedUsers = [];

$("body").on("click", ".select-chat-user", function (e) {
    let user = $(this).parent().find('.fullname').data('username')
    selectedUsers.push(user)
    console.log(selectedUsers)
    selectedUsersDisplay()
    $('#searchInputChat').val('').focus()
    $('.search-result').empty()
    $('#add-chat-user').prop('disabled', false)
})

const selectUsers = () => {
    $('#searchInputChat').on('keydown', function (e) {
        if ($(this).val() == '' && e.which == 8) {
            selectedUsers.pop()
            $('.search-result').empty()
            selectedUsersDisplay()
            if (selectedUsers.length == 0) {
                $('#add-chat-user').prop('disabled', true)
            }
        }
        $('.search-result').empty();
        searchUser($(this).val(), '.search-result', true)
        $('.btn-close').click(() => $(this).val(''))
        if (e.which == 27)
            $(this).val('')
    })
}

const selectedUsersDisplay = () => {
    $(".appended-users").remove()
    $("#searchForChatUsers").prepend(`<span class="appended-users border border-3 rounded p-1">${selectedUsers.join(' ')}</span`)
}

const renderChatList = (chatList, where) => {
    var load = chatList.length == 0
        ? /*html*/`<span>Nothing to show.</span>`
        : `${renderChat(chatList)}`
    $(where).append(load);
}

const renderChat = (chatList) => {
    let loadChat = '';
    for (let chat of chatList) {
        loadChat += /*html*/
            `<div class="card">
                <div class="card-title">
                    ${getUsersChat(chat, chat.users)}
                </div>
                <div class="card-body">
                    <span>${chat._id}</span>
                </div>
            </div>
        `
    }
    return loadChat
}

const getUsersChat = (chat, usersChat) => {
    let loadUsers = '';
    for (let user of usersChat) {
        loadUsers += /*html*/
            `<a
                href="/messages/${chat._id}"
                class="text-dark text-decoration-none"
            >${user.firstname}</a
            >`
    }
    return loadUsers
}

const getChatList = () => {
    fetch(`${APP_URL}chatList`, {
        type: "GET",
    })
        .then((res) => res.json())
        .then((data) =>
            data.length > 0
                ? renderChatList(data, ".chat-container")
                : (($(".posts-container").empty())($(".posts-container").html(data.posts)))
        )
        .catch((er) => console.log(er));
};

$('#add-chat-user').click(() => {
    const data = JSON.stringify(selectedUsers)
    $.post(`${APP_URL}messages/new`, {
        users: data
    })
        .then((res) => {
            window.location.href = `${APP_URL} messages`
        })
})

export { selectedUsers, selectUsers, getChatList }