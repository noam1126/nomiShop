import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faUser,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

// Sample product data
const productsData = {
  Electronics: [
    {
      id: 1,
      name: "Smartphone",
      price: "$499",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Laptop",
      price: "$999",
      imgSrc: "https://via.placeholder.com/150",
    },
  ],
  Clothing: [
    {
      id: 3,
      name: "T-shirt",
      price: "$19.99",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Jeans",
      price: "$39.99",
      imgSrc: "https://via.placeholder.com/150",
    },
  ],
  "Home & Kitchen": [
    {
      id: 5,
      name: "Blender",
      price: "$59.99",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Cookware Set",
      price: "$149.99",
      imgSrc: "https://via.placeholder.com/150",
    },
  ],
  Shoes: [
    {
      id: 7,
      name: "Running Shoes",
      price: "$79.99",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      name: "Boots",
      price: "$129.99",
      imgSrc: "https://via.placeholder.com/150",
    },
  ],
};

const allProducts = [
  ...productsData.Electronics,
  ...productsData.Clothing,
  ...productsData["Home & Kitchen"],
  ...productsData.Shoes,
];

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const products =
    selectedCategory === "All" ? allProducts : productsData[selectedCategory];
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleNewItem = () => {
    navigate("/newItemPage");
  };

  const handleAllItems = () => {
    navigate("/allItems");
  };

  const handleCart = () => {
    navigate("/shoppingCart");
  };

  return (
    <div className="dashboard">
      {/* Header with icons */}
      <header className="header">
        {/* <h1 className="site-title">Nomi shop</h1> */}
        <img
          src="/nomi-shop-high-resolution-logo-black-transparent.png"
          alt="Nomi Shop Logo"
          className="site-logo"
        />
        <div className="icons">
          <button className="icon-button" id="home">
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button
            className="icon-button"
            id="shoppingCart"
            onClick={handleCart}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <button className="icon-button" id="heart" onClick={handleNewItem}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
          {/* onClick={handleSearch} */}
          <button className="icon-button" id="search" onClick={handleAllItems}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            className="icon-button"
            id="userProfile"
            onClick={handleProfileClick}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </header>

      {/* Sliding message */}
      <section className="sliding-message">
        <div className="message">
          🎉 Big Sale! Up to 50% off on selected items! 🎉
        </div>
      </section>

      {/* Categories Navbar */}
      <nav className="categories-navbar">
        <button
          className={`nav-item ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => handleCategoryChange("All")}
        >
          All
        </button>
        <button
          className={`nav-item ${
            selectedCategory === "Electronics" ? "active" : ""
          }`}
          onClick={() => handleCategoryChange("Electronics")}
        >
          Electronics
        </button>
        <button
          className={`nav-item ${
            selectedCategory === "Clothing" ? "active" : ""
          }`}
          onClick={() => handleCategoryChange("Clothing")}
        >
          Clothing
        </button>
        <button
          className={`nav-item ${
            selectedCategory === "Home & Kitchen" ? "active" : ""
          }`}
          onClick={() => handleCategoryChange("Home & Kitchen")}
        >
          Home & Kitchen
        </button>
        <button
          className={`nav-item ${selectedCategory === "Shoes" ? "active" : ""}`}
          onClick={() => handleCategoryChange("Shoes")}
        >
          Shoes
        </button>
      </nav>

      {/* Product Showcase */}
      <section className="product-showcase">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.imgSrc}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
