import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import{toast} from "react-toastify";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  //  NEW STATE FOR PHONE
  const [phone, setPhone] = useState("");

  // EXTRACT PHONE FROM TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setPhone(decoded.phone);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

 const handleLogout = () => {
  // remove token
  localStorage.removeItem("token");

  // show toast
  toast.success("Logged out successfully 👋");

  // delay redirect
  setTimeout(() => {
    window.location.href = "https://zerodha-frontend-dzxz.onrender.com/signup";
  }, 1500); // 1.5 sec
};

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  //  MASK PHONE
  const maskedPhone = phone ? "****" + phone.slice(-4) : "User";

  // AVATAR LETTER
  const avatarLetter = phone ? phone[0] : "U";

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

        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{avatarLetter}</div>
          <p className="username">{maskedPhone}</p>
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
