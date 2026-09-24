import { Link,useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../features/auth/useAuth";
import { useState } from "react";
import { loginRequest } from "../api/auth.api.js";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const from = location.state?.from?.pathname || "/";

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data);
      navigate(from, { replace: true });
    },
    onError: (err) => {
      if (err.details) {
        const map = {};
        for (const d of err.details) map[d.field] = d.message;
        setFieldErrors(map);
      }
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFieldErrors({});
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Log in</h1>
        {mutation.isError && !mutation.error.details && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">
            {mutation.error.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="email"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="current-password"
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition"
          >
            {mutation.isPending ? "Logging in..." : "Log in"}
          </button>
        </form>
        
         <p className="mt-6 text-sm text-gray-600 text-center">
          No account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
          </p>
      </div>
    </div>
  );
}
