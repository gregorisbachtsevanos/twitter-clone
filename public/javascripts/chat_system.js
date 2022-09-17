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
            `<a class="card text-decoration-none text-dark" href='/chat/${chat._id}'>
                <div class="card-title d-flex align-items-baseline chat-image ellipsis">
                    <p class="chat-image-container">${getUsersChatImg(chat.users)}</p>
                    ${getUsersChat(chat.users)}
                </div>
                <div class="card-body ellipsis  w-50">
                    <span class="ellipsis">Last Message</span>
                </div>
            </a>
        `
    }
    return loadChat
}

const getUsersChat = (usersChat) => {
    usersChat = usersChat.filter(user => user._id !== USER)
    let restUsers = usersChat.map(user => user.firstname + ' ' + user.surname)
    let nameUsers = restUsers.join(', ')
    return `<span class="ms-1 ellipsis w-75">${nameUsers}</span>`
}

const getUsersChatImg = (usersChat) => {
    usersChat = usersChat.filter(user => user._id !== USER)
    var size = usersChat.length > 1 ? '1.5rem' : '2rem'
    var chatImg = usersChat[0].extra_info.avatar
        ? `<img src="${usersChat[0].extra_info.avatar}" alt="avatar" />`
        : `<span style="height:${size};width:${size};font-size:.7rem"class="position-absolute d-flex justify-content-center align-items-center border-white border rounded-circle bg-dark text-white avatar">${usersChat[0].firstname.charAt(3).toUpperCase()}</span>`;
    if (usersChat[1]) {
        chatImg += usersChat[1].extra_info.avatar
            ? `<img src="${usersChat[1].extra_info.avatar}" alt="avatar" />`
            : `<span style="height:1.5rem;width:1.5rem;font-size:.7rem"class="position-absolute d-flex justify-content-center align-items-center border-white border rounded-circle bg-dark text-white avatar">${usersChat[1].firstname.charAt(3).toUpperCase()}</span>`;
        chatImg += `<span class="position-absolute avatar more-users">+${usersChat.length - 2}</span>`
    }
    return chatImg
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

$('#personal-chat-user').click((e) => {
    const id = $(e.target).data('id')
    $.get(`${APP_URL}chat/${id}`)
        .then((res) => {
            window.location.href = `${APP_URL}chat/${id}`
        })
})


export { selectedUsers, selectUsers, getChatList }