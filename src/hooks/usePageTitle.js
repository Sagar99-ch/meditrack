import { useLocation } from "react-router-dom";

const titles = {
  "/": "Dashboard",
  "/medicines": "Medicines",
  "/purchase": "Purchase",
  "/suppliers": "Suppliers",
  "/reports": "Reports",
  "/settings": "Settings",
};

const usePageTitle = () => {
  const location = useLocation();

  return titles[location.pathname] || "Dashboard";
};

export default usePageTitle;
