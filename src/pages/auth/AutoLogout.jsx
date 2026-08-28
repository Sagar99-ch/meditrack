import { useEffect } from "react";

const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutes

const AutoLogout = () => {
  useEffect(() => {
    let timer;

    const logout = () => {
      sessionStorage.removeItem("currentUser");

      window.location.replace("/login");
    };

    const resetTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(logout, INACTIVITY_TIME);
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timer);

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return null;
};

export default AutoLogout;
