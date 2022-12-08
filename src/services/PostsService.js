import api from "../api";

const posts = data => {
    return api.post(`api/posts`, data)
}

const getAll = () =>{
    return api.get(`/api/timeline`)
}

const getDetailPost = id => {
    return api.get(`api/timeline/${id}`)
}

const PostsService = {
    posts,
    getAll,
    getDetailPost
}

export default PostsService;