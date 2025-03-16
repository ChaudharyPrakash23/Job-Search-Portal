import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin, publicOnly }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const isUserAdmin = user && user.email === "admin@example.com";

  if (publicOnly && isUserAdmin) {
    return <Navigate to="/dashboard" />;
  }
  if (isAdmin && !isUserAdmin) {
    return <Navigate to="/jobs" />;
  }

  return children;
};

export default ProtectedRoute;
