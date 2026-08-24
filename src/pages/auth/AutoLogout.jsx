import { useEffect } from "react";

const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes

const AutoLogout = () => {
  useEffect(() => {
    const checkUser = () => {
      return localStorage.getItem("currentUser");
    };

    let inactivityTimer;

    const logout = () => {
      localStorage.removeItem("currentUser");

      // Redirect to login
      window.location.href = "/login";
    };

    const resetTimer = () => {
      clearTimeout(inactivityTimer);

      // Agar user logged in nahi hai to timer mat chalao
      if (!checkUser()) {
        return;
      }

      // Login page par timer mat chalao
      if (window.location.pathname === "/login") {
        return;
      }

      inactivityTimer = setTimeout(() => {
        logout();
      }, INACTIVITY_LIMIT);
    };

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Initial timer
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);

      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return null;
};

export default AutoLogout;
