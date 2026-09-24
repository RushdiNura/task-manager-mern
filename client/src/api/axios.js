// src/api/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

// REQUEST: attach access token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE: silent refresh on 401, then retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const res = error.response;

    const isAuthEndpoint =
      original?.url?.includes("/auth/refresh") ||
      original?.url?.includes("/auth/login") ||
      original?.url?.includes("/auth/register");

    // Attempt refresh only if:
    //   - got a 401
    //   - haven't already retried this request
    //   - it's not an auth endpoint (avoid infinite loops)
    if (res?.status === 401 && !original._retry && !isAuthEndpoint) {
      original._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // No way to refresh — force logout
        localStorage.clear();
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject({ status: 401, message: "Session expired" });
      }

      try {
        // Use RAW axios (not `api`) so this call doesn't trigger the interceptor again
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL || "/api"}/auth/refresh`,
          { refreshToken },
        );

        const newAccessToken = data?.data?.accessToken;
        if (!newAccessToken)
          throw new Error("No access token in refresh response");

        localStorage.setItem("accessToken", newAccessToken);
        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(original); // retry original
      } catch (refreshErr) {
        localStorage.clear();
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject({ status: 401, message: "Session expired" });
      }
    }

    // Normalize all other errors
    const message =
      res?.data?.message || error.message || "Something went wrong";
    const details = res?.data?.errors || null;
    return Promise.reject({ status: res?.status, message, details });
  },
);

export default api;
