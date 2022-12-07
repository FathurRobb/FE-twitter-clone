import api from "../api";

const register = data => {
    return api.post(`api/signup`, data);
}

const AuthService = {
    register
}

export default AuthService;