import { ajaxCall } from './functions.js'

const follow = () => {
    $('body').on('click', '.follow-btn', (e) => {
        e.preventDefault();
        $('.follow-btn')
            .addClass('unfollow-btn')
            .removeClass('follow-btn')
            .html('unfollow')
        ajaxCall(e.target.getAttribute('data-username'), 'follow', 'POST')
    })
}

const unfollow = () => {
    $('body').on('click', '.unfollow-btn', (e) => {
        e.preventDefault();
        $('.unfollow-btn')
            .addClass('follow-btn')
            .removeClass('unfollow-btn')
            .html('follow')
        ajaxCall(e.target.getAttribute('data-username'), 'unfollow', 'POST')
    })
}

export { follow, unfollow }