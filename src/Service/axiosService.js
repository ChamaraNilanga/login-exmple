import axios from 'axios';

const BaseUrl = 'https://8bc0-43-252-15-89.ngrok-free.app/api';

const registerUser = (requestBody) => {
	return axios.post(`${BaseUrl}/users/register`, requestBody);
};

const loginUser = (requestBody) => {
	return axios.post(`${BaseUrl}/users/login`, requestBody);
};

const deletePost = (id) => {
	return axios.delete(`${BaseUrl}/admin/location/${id}`);
};

export { registerUser, loginUser, deletePost };
