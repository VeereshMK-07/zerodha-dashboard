import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href =
        "https://zerodha-frontend-dzxz.onrender.com/signup";
    }
  }, [isLoggedIn]);

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;