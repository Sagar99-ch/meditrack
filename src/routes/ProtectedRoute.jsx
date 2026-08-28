import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = sessionStorage.getItem("currentUser");

  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Invalid session data:", error);
    sessionStorage.removeItem("currentUser");
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
