import { useNavigate } from "react-router-dom";

const AUTH_KEY = "meditrack_auth";

function useAuth() {
  const navigate = useNavigate();

  // Login
  const login = (user) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    navigate("/", { replace: true });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate("/login", { replace: true });
  };

  // Check Auth
  const isAuthenticated = () => {
    return !!localStorage.getItem(AUTH_KEY);
  };

  // Current User
  const getUser = () => {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
  };

  return {
    login,
    logout,
    isAuthenticated,
    getUser,
  };
}

export default useAuth;
