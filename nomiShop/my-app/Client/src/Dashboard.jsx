import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faUser,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

const Dashboard = () => {
  const [latestItems, setLatestItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/latestItems")
      .then((response) => {
        setLatestItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the latest items!", error);
      });
  }, []);

  const handleProfileClick = () => {
    const userType = localStorage.getItem("userType");
    if (userType === "buyer") {
      navigate("/buyerProfile");
    } else if (userType === "seller") {
      navigate("/sellerProfile");
    }
  };

  const handleNewItem = () => {
    navigate("/newItemPage");
  };

  const handleAllItems = () => {
    navigate("/allItems");
  };

  const handleSaleClick = () => {
    navigate("/sale");
  };

  const handleExploreItemsClick = () => {
    navigate("/itemslistpage");
  };

  return (
    <div className="dashboard">
      <header className="header">
        
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

      <section className="sliding-message" onClick={handleSaleClick}>
        <div className="message">
          🎉 Big Sale! Up to 50% off on selected items! 🎉
        </div>
      </section>

      <section className="explore-banner" onClick={handleExploreItemsClick}>
        <img
          src="../public/shopBanner.jpg"
          alt="Explore Items"
          className="explore-banner-image"
        />
      </section>

      <section className="latest-items">
        <h2 className="section-title">Latest Items</h2>
        <div className="product-list">
          {latestItems.length > 0 ? (
            latestItems.map((item) => {
              const imageUrl = `http://localhost:3001/${item.image}`;
              return (
                <div key={item._id} className="product-item">
                  <img src={imageUrl} alt={item.name} className="product-image" />
                  <div className="product-info">
                    <p className="product-name">{item.name}</p>
                    <p className="product-price">Price: ${item.price}</p>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No items added in the last 24 hours.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
