import { getPosts, getUserPosts } from './post_system.js'
import { likePost } from './like_system.js'

if(typeof PAGE != 'undefined'){
    if(PAGE == 'INDEX'){
        getPosts()
        likePost()
    }else if(PAGE == 'PROFILE'){
        getUserPosts(USER)
    }
}