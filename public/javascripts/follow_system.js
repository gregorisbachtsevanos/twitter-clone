import { ajaxCall } from './functions.js'

const follow = () => {
    $('body').on('click', '.follow-btn', (e) => {
        e.preventDefault();
        ajaxCall(e.target.getAttribute('data-username'), 'follow', 'POST')
    })
}

export { follow }