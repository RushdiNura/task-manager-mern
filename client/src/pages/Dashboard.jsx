// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth.js";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Tasks</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-gray-600">Task list coming in Milestone 7C.</p>
      </main>
    </div>
  );
}
