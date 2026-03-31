import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {

      // FIRST: check URL token
      const params = new URLSearchParams(window.location.search);
      const tokenFromURL = params.get("token");

      if (tokenFromURL) {
        localStorage.setItem("token", tokenFromURL);
        window.history.replaceState({}, document.title, "/");
      }

      const token = localStorage.getItem("token");

      // DEMO USER
      if (token === "demo-user") {
        setIsAuth(true);
        return;
      }

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

  // ⏳ loading state
  if (isAuth === null) return <h2>Loading...</h2>;

  // ❌ redirect only AFTER check completes
  if (!isAuth) {
    window.location.replace (
      "https://zerodha-frontend-dzxz.onrender.com/signup"
    );
    return null;
  }

  return children;
};

export default ProtectedRoute;