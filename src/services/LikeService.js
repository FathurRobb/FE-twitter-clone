import api from "../api";

const action = () => {
    return api.put(`/posts/${id}/like`);
}

const LikeService = {
    action
}

export default LikeService;