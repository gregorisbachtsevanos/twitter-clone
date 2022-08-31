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

$('#add-chat-user').click(() => {
    const data = JSON.stringify(selectedUsers)
    $.post(`${APP_URL}messages/new`, {
        users: data
    })
        .then((res) => {
            window.location.href = `${APP_URL}messages`
        })
})

export { selectedUsers, selectUsers }