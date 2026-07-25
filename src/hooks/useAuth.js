import { useNavigate } from "react-router-dom";

const AUTH_KEY = "meditrack_auth";

const useAuth = () => {
  const navigate = useNavigate();

  const login = (user) => {
    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        ...user,
        loginTime: new Date().toISOString(),
      })
    );

    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate("/");
  };

  const getUser = () => {
    const user = localStorage.getItem(AUTH_KEY);

    return user ? JSON.parse(user) : null;
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem(AUTH_KEY);
  };

  return {
    login,
    logout,
    getUser,
    isAuthenticated,
  };
};

export default useAuth;
