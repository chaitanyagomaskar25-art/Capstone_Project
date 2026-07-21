import { Navigate } from "react-router";
import { useAuthState } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { role } = useAuthState();

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;