// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-gray-600">Page not found.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
