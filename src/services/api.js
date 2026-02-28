import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://parqueo-backend.onrender.com/api/vendedores";

export const getVendedores = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createVendedor = async (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateVendedor = async (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteVendedor = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
