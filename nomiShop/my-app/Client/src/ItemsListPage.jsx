import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ItemsListPage.css";
import {
  faShoppingCart,
  faHeart,
  faUser,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ItemsListPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/allItems")
      .then((response) => {
        setItems(response.data);
        setFilteredItems(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterItems(searchQuery, category);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterItems(query, selectedCategory);
  };

  const filterItems = (query, category) => {
    let filtered = items;

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (query) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleNewItem = () => {
    navigate("/itemPage");
  };

  const handleAllItems = () => {
    navigate("/allItems");
  };

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1 className="site-title">Nomi shop</h1>
        <div className="icons">
          <button className="icon-button" id="home">
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button className="icon-button" id="shoppingCart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <button className="icon-button" id="heart" onClick={handleNewItem}>
            <FontAwesomeIcon icon={faHeart} />
          </button>
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

      <nav className="categories-navbar">
        <button
          className={`nav-item ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => handleCategoryChange("All")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`nav-item ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <section className="product-showcase">
        <div className="product-list">
          {filteredItems.map((item) => {
            const imageUrl = `http://localhost:3001/${item.image}`;
            return (
              <div
                key={item._id}
                className="product-item"
                onClick={() => handleItemClick(item._id)}
              >
                <img src={imageUrl} alt={item.name} className="product-image" />
                <div className="product-info">
                  <p className="product-name">{item.name}</p>
                  <p className="product-price">Price: ${item.price}</p>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default ItemsListPage;
