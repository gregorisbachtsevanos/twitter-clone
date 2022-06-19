import { getPosts, getUserPosts } from './post_system.js'
import { likePost } from './like_system.js'
import { commentPost } from './comment_system.js'

if (typeof PAGE != 'undefined') {
    if (PAGE == 'INDEX') {
        getPosts()
        likePost()
        commentPost()
    } else if (PAGE == 'PROFILE') {
        getUserPosts(USER)
    }
}