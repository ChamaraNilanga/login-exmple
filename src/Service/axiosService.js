import axios from "axios";

const BaseUrl = "https://6185-2402-4000-2200-b65a-acb5-ad1a-b07d-8ce3.ngrok-free.app/api";

const registerUser = (requestBody) => {        
    return axios.post(`${BaseUrl}/register`, requestBody);
};

const loginUser = (requestBody) => {        
    return axios.post(`${BaseUrl}/login`, requestBody);
};

const deletePost = (id) => {        
    return axios.delete(`${BaseUrl}/admin/location/${id}`);
};

export { registerUser , loginUser , deletePost };