import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`
});

API.interceptors.request.use(config => {
    const token = Cookies.get("token");
    const csrftoken = Cookies.get("csrftoken");
    config.headers.post["X-CSRFToken"] = csrftoken;
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;

