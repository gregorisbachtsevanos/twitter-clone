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
                <div class="card-title d-flex align-items-baseline">
                    ${getUsersChatImg(chat.users)}
                    ${getUsersChat(chat.users)}
                </div>
                <div class="card-body">
                    <span>Last Message</span>
                </div>
            </div>
        `
    }
    return loadChat
}

const getUsersChat = (usersChat) => {
    usersChat = usersChat.filter(user => user._id !== USER)
    let restUsers = usersChat.map(user => user.firstname + ' ' + user.surname)
    let nameUsers = restUsers.join(', ')
    return `<span class="ms-1">${nameUsers}</span>`
}

const getUsersChatImg = (usersChat) => {
    usersChat = usersChat.filter(user => user._id !== USER)
    return usersChat[0].extra_info.avatar
        ? `<img src="${usersChat[0].extra_info.avatar}" alt="avatar" />`
        : `<p style="height:2rem;width:2rem;font-size:1rem"class="d-flex justify-content-center align-items-center border rounded-circle bg-dark text-white">${usersChat[0].surname.charAt(0).toUpperCase()}</p>`
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
            window.location.href = `${APP_URL}messages`
        })
})

export { selectedUsers, selectUsers, getChatList }