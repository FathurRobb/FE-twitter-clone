import axios from "axios";

export default axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
})