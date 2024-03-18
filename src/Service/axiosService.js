import axios from "axios";

const BaseUrl = "https://842a-43-252-15-89.ngrok-free.app/api";
const addDetailsUrl =
  "https://842a-43-252-15-89.ngrok-free.app/api/buses/add-bus";
const getDetailsUrl = "https://842a-43-252-15-89.ngrok-free.app/api/buses/";
const regUser = "http://localhost:3500/user";
const logUser = "http://localhost:3500/user/login";

const token = localStorage.getItem("token");
console.log("TOKEN : ", token);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  "ngrok-skip-browser-warning": true,
};

const authHeaders = () => {
  let userToken = localStorage.getItem("token");
  return { headers: { Authorization: userToken } };
};

const registerUser = (requestBody) => {
  return axios.post(regUser, requestBody);
};

const updateImage = (formData) => {
  return axios.put(regUser, formData);
};

const loginUser = (requestBody) => {
  return axios.post(logUser, requestBody);
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

const deleteDetails = (id) => {
  return axios.delete(`${BaseUrl}/buses/${id}`, { headers: headers });
};

const updateDetails = (id, requestBody) => {
  return axios.put(`${BaseUrl}/buses/${id}`, requestBody, { headers: headers });
};

export {
  registerUser,
  loginUser,
  deletePost,
  addDetails,
  getDetails,
  deleteDetails,
  updateDetails,
  updateImage
};
