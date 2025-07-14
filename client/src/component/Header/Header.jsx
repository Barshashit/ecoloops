import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ user, onLogout }) => {  // CHANGE 1: Receive user object and onLogout
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?query=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleAccountClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleMenuOption = (option) => {
    switch(option) {
      case "history":
        navigate("/account/history");
        break;
      case "auth":
        navigate("/auth");
        break;
      case "logout":
        onLogout();  // CHANGE 2: Use passed onLogout function
        navigate("/");
        break;
    }
    setShowMenu(false);
  };

  return (
    <div className="header">
      <div className="header-logo">
        <img src="/images/walmart.png" alt="Walmart Logo" />
      </div>

      <div className="header-location">
        Pickup or delivery? Sacramento, 95829 ▾
      </div>

      <form className="header-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search everything at Walmart online and in store"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-icon" aria-label="Search">
          🔍
        </button>
      </form>

      <div className="header-menu">
        <div className="menu-block" style={{ position: "relative" }}>
          {/* CHANGE 3: Use user.name instead of userName */}
          <span onClick={handleAccountClick} style={{ cursor: "pointer" }}>
            {user ? `Hi, ${user.name}` : "Sign In"}
          </span>
          <span>Account</span>
          {showMenu && (
            <div className="account-dropdown">
              {!user && (
                <div onClick={() => handleMenuOption("auth")} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Login</span>
                  <span>/</span>
                  <span>Create Account</span>
                </div>
              )}
              <div onClick={() => handleMenuOption("history")}>
                Account History
              </div>
              {user && (
                <div onClick={() => handleMenuOption("logout")}>
                  Logout
                </div>
              )}
            </div>
          )}
        </div>

        <div className="menu-block menu-cart">
          <span>🛒</span>
          <span>$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default Header;


