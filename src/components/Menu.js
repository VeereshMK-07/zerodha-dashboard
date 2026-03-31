import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  // FETCH USER FROM BACKEND
  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token === "demo-user") {
      setUserName("Demo User");
      setPhone("9999999999");
      return;
    }

    if (!token) return;

    axios
      .get("https://zerodha-backend-e1fx.onrender.com/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserName(res.data.user.name);
        setPhone(res.data.user.phone);
      })
      .catch(() => {
        console.error("User fetch failed");
      });
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success(`Bye ${userName || "User"} 👋`);

    setTimeout(() => {
      window.location.replace (
        "https://zerodha-frontend-dzxz.onrender.com/signup"
      );
    }, 1500);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  // DISPLAY LOGIC
  const displayName = userName || "User";
  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <div className="menu-container">
      <img src="kite-logo.svg" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {/*  PROFILE */}
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{avatarLetter}</div>
          <p className="username">{displayName}</p>
        </div>

        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <p className="logout-option" onClick={handleLogout}>
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
