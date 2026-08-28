import { useNavigate } from "react-router-dom";

const AUTH_KEY = "meditrack_auth";

function useAuth() {
  const navigate = useNavigate();

  // =====================================================
  // Login
  // =====================================================

  const login = (user) => {
    // Session storage use karenge
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));

    // AutoLogout ke liye currentUser bhi maintain kar rahe hain
    sessionStorage.setItem("currentUser", JSON.stringify(user));

    navigate("/", {
      replace: true,
    });
  };

  // =====================================================
  // Logout
  // =====================================================

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem("currentUser");

    navigate("/login", {
      replace: true,
    });
  };

  // =====================================================
  // Check Authentication
  // =====================================================

  const isAuthenticated = () => {
    return !!sessionStorage.getItem(AUTH_KEY);
  };

  // =====================================================
  // Current User
  // =====================================================

  const getUser = () => {
    const user = sessionStorage.getItem(AUTH_KEY);

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Invalid authentication data:", error);

      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem("currentUser");

      return null;
    }
  };

  return {
    login,
    logout,
    isAuthenticated,
    getUser,
  };
}

export default useAuth;
