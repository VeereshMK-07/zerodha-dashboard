import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = checking

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        await axios.get(
          "https://zerodha-backend-e1fx.onrender.com/api/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsAuth(true);
      } catch (err) {
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    };

    verifyUser();
  }, []);

  // ⏳ While checking
  if (isAuth === null) return <h2>Loading...</h2>;

  // ❌ Not authenticated
  if (!isAuth) {
    window.location.href =
      "https://zerodha-frontend-dzxz.onrender.com/signup";
    return null;
  }

  // ✅ Authenticated
  return children;
};

export default ProtectedRoute;