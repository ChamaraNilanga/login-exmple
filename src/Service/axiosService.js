import axios from "axios";

const BaseUrl = "https://8bc0-43-252-15-89.ngrok-free.app/api";
const addDetailsUrl =
  "https://8bc0-43-252-15-89.ngrok-free.app/api/buses/add-bus";
const getDetailsUrl =
  "https://8bc0-43-252-15-89.ngrok-free.app/api/buses/get-all-buses";

const token = localStorage.getItem("token");
console.log("TOKEN : ", token);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

const authHeaders = () => {
  let userToken = localStorage.getItem("token");
  return { headers: { Authorization: userToken } };
};

const registerUser = (requestBody) => {
  return axios.post(`${BaseUrl}/users/register`, requestBody);
};

const loginUser = (requestBody) => {
  return axios.post(`${BaseUrl}/users/login`, requestBody);
};

const deletePost = (id) => {
  return axios.delete(`${BaseUrl}/admin/location/${id}`);
};

const addDetails = (requestBody) => {
  return axios.post(addDetailsUrl, requestBody, { headers: headers });
};

const getDetails = () => {
  return axios.get(getDetailsUrl, { headers: headers });
};

export { registerUser, loginUser, deletePost, addDetails, getDetails };
