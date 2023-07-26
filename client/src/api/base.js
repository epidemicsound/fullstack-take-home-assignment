import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export const getAll = async (url) => {
  const resp = await axios.get(`${BASE_URL}/${url}`, { mode: "cors" });
  return resp.data;
};

export const createOne = async (url, data) => {
  const resp = await axios.post(`${BASE_URL}/${url}`, data, { mode: "cors" });
  return resp.data;
};

export const deleteOne = async (url) => {
  const resp = await axios.delete(`${BASE_URL}/${url}`, { mode: "cors" });
  return resp.data;
};
