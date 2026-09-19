import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error.response;
    if (res?.status === 401) {
      // place to trigger refresh logic later
    }

    const message =
      res?.data?.message || error.message || "Something went wrong";
    const details = res?.data?.errors || null;

    return Promise.reject({ status: res?.status, message, details });
  },
);

export default api;