import api from "./axios.js";
export const registerRequest = (data) => {
  api.post("/auth/register", data).then((r) => r.data.data);
};

export const loginRequest = (data) => {
  api.post("/auth/login", data).then((r) => r.data.data);
};

export const refreshRequest = (refreshToken) =>
  api.post("/auth/refresh", { refreshToken }).then((r) => r.data.data);

export const meRequest = () => {
  api.get("/auth/me").then((r) => r.data.data);
};
