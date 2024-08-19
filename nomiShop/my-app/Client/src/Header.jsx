import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="header">
      <img
        src="../public/nomi-shop-high-resolution-logo-black-transparent.png"
        alt="Nomi Shop Logo"
        className="site-logo"
      />
      <div className="icons">
        <button
          className="icon-button"
          onClick={() => handleNavigation("/dashboard")}
        >
          <FontAwesomeIcon icon={faHome} />
        </button>
        <button
          className="icon-button"
          onClick={() => handleNavigation("/shoppingCart")}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        <button
          className="icon-button"
          onClick={() => handleNavigation("/allItems")}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button
          className="icon-button"
          onClick={() => handleNavigation("/profile")}
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </header>
  );
};

export default Header;
