import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          "https://zerodha-backend-e1fx.onrender.com/api/auth/check-auth",
          { withCredentials: true }
        );

        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        window.location.href =
          "https://zerodha-frontend-dzxz.onrender.com/signup";
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <h3>Loading...</h3>;

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;