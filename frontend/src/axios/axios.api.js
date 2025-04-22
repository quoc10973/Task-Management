import axios from "./axios.config";

const login = async (email, password) => {
    const URL_API = "/user/login";
    let data = {
        email: email,
        password: password,
    };
    return axios.post(URL_API, data);
}

export {
    login,
}