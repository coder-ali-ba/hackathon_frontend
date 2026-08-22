import axios from "axios";

const API_URL =
  "https://hackathon-backend-seven-jet.vercel.app/api/project";

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/getallProjects`);
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProject = async (data) => {
  const response = await axios.post(`${API_URL}/create`, data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    data
  );

  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};

export const approveProject = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    {
      status: "Approved",
    }
  );

  return response.data;
};

export const rejectProject = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    {
      status: "Rejected",
    }
  );

  return response.data;
};