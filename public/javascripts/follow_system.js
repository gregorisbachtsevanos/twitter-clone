import { ajaxCall } from './functions.js'

const follow = () => {
    $('body').on('click', '.follow-btn', (e) => {
        e.preventDefault();
        try{
            ajaxCall(`${e.target.getAttribute('data-username')}/follow`, 'POST');
            $('.follow-btn')
                .addClass('unfollow-btn')
                .removeClass('follow-btn')
                .html('unfollow');
        } catch (e) {
            console.log(e);
        }
    })
}

const unfollow = () => {
    $('body').on('click', '.unfollow-btn', (e) => {
        e.preventDefault();
        try {
            ajaxCall(`${e.target.getAttribute('data-username')}/unfollow`, 'POST');
            $('.unfollow-btn')
                .addClass('follow-btn')
                .removeClass('unfollow-btn')
                .html('follow');
        } catch (e) {
            console.log(e);
        }
    })
}

export { follow, unfollow }