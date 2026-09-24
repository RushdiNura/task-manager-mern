import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth.js";

export function ProtectedRoute({children}){
    const { isAuthenticated } = useAuth();
    const location = useLocation();

      if (!isAuthenticated) {
        // Remember where they were trying to go
        return <Navigate to="/login" state={{ from: location }} replace />;
      }

      return children;
     
}