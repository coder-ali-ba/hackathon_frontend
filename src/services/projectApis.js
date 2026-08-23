import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  "https://hackathon-backend-seven-jet.vercel.app/api/project";

const getConfig = () => {
  const token = Cookies.get("token");

  console.log("TOKEN:", token);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET ALL PROJECTS
export const getProjects = async () => {
  const response = await axios.get(
    `${API_URL}/getallProjects`,
    getConfig()
  );

  return response.data;
};

// CREATE PROJECT
export const createProject = async (data) => {
  const response = await axios.post(
    `${API_URL}/create`,
    data,
    getConfig()
  );

  return response.data;
};

// UPDATE PROJECT
export const updateProject = async (id, data) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    data,
    getConfig()
  );

  return response.data;
};

// DELETE PROJECT
export const deleteProject = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getConfig()
  );

  return response.data;
};


export const approveProject = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    {
      status: "Approved",
    },
    getConfig()
  );

  return response.data;
};

export const rejectProject = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    {
      status: "Rejected",
    },
    getConfig()
  );

  return response.data;
};