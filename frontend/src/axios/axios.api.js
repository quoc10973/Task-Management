import axios from "./axios.config";

const login = async (email, password) => {
    const URL_API = "/user/login";
    let data = {
        email: email,
        password: password,
    };
    return axios.post(URL_API, data);
}

const getAvailableTasks = async () => {
    const URL_API = "/tasks/available";
    return axios.get(URL_API);
}

const assignTask = async (taskId, userId) => {
    const URL_API = `/tasks/${taskId}/assign/${userId}`;
    return axios.post(URL_API);
}

const getMyTask = async (userId) => {
    const URL_API = `/tasks/user/${userId}`;
    return axios.get(URL_API);
}

const completeTask = async (taskId, userId) => {
    const URL_API = `/tasks/${taskId}/complete/${userId}`;
    return axios.post(URL_API);
}

export {
    login,
    getAvailableTasks,
    assignTask,
    getMyTask,
    completeTask,
}