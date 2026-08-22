// import axios from "axios";
// import Cookies from "js-cookie";

// const API_URL =
//   "https://hackathon-backend-seven-jet.vercel.app/api/project";

// const getHeaders = () => {
//   const token = Cookies.get("token");

//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// // GET ALL PROJECTS
// export const getProjects = async () => {
//   const response = await axios.get(
//     `${API_URL}/getallProjects`,
//     getHeaders()
//   );

//   return response.data;
// };

// // CREATE PROJECT
// export const createProject = async (data) => {
//   const response = await axios.post(
//     `${API_URL}/create`,
//     data,
//     getHeaders()
//   );

//   return response.data;
// };

// // UPDATE PROJECT
// export const updateProject = async (id, data) => {
//   const response = await axios.put(
//     `${API_URL}/${id}`,
//     data,
//     getHeaders()
//   );

//   return response.data;
// };

// // DELETE PROJECT
// export const deleteProject = async (id) => {
//   const response = await axios.delete(
//     `${API_URL}/${id}`,
//     getHeaders()
//   );

//   return response.data;
// };

// // APPROVE PROJECT
// export const approveProject = async (id) => {
//   const response = await axios.put(
//     `${API_URL}/${id}`,
//     {
//       status: "approved",
//     },
//     getHeaders()
//   );

//   return response.data;
// };

// // REJECT PROJECT
// export const rejectProject = async (id) => {
//   const response = await axios.put(
//     `${API_URL}/${id}`,
//     {
//       status: "rejected",
//     },
//     getHeaders()
//   );

//   return response.data;
// };

import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  "https://hackathon-backend-seven-jet.vercel.app/api/project";

const getConfig = () => {
  const token = Cookies.get("token");

  console.log("TOKEN FROM COOKIE:", token);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const createProject = async (data) => {
  console.log("PROJECT DATA:", data);

  const response = await axios.post(
    `${API_URL}/create`,
    data,
    getConfig()
  );

  return response.data;
};