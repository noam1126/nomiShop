import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./ItemsListPage.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { UserContext } from "./UserContext";

function ItemsListPage() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(UserContext);
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

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  const handleAddToCart = (item) => {
    const userId = user._id;

    axios
      .post("http://localhost:3001/shoppingCart", {
        userId,
        item,
      })
      .then(() => {
        alert("Item added to cart!");
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart!", error);
      });
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

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
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                  >
                    Add to Cart
                  </button>
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
