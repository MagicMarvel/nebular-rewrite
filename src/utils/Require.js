import axios from "axios";

const instance = axios.create({
    // baseURL: BASE_URL + "/api",
    baseURL: "/api",
});

const exp = {
    get: instance.get,
    post: instance.post,
};

export default exp;
