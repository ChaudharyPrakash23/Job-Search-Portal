import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If the user is not an admin, redirect to the jobs page
  if (!user || (isAdmin && user.email !== "admin@example.com")) {
    return <Navigate to="/jobs" />;
  }

  return children;
};

export default ProtectedRoute;
