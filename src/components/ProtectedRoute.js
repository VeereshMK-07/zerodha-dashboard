const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href =
      "https://zerodha-frontend-dzxz.onrender.com/signup";
    return null;
  }

  return children;
};

export default ProtectedRoute;