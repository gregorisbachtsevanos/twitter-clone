import { getPosts } from './post_system.js'
import { likePost } from './like_system.js'

if(PAGE != 'undefined'){
    if(PAGE == 'INDEX'){
        getPosts()
        likePost()
    }else if(PAGE == 'PROFILE'){

    }
}