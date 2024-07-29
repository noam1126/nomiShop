import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faUser,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const userId = "your-user-id"; // Replace with the actual userId from your auth system

  useEffect(() => {
    axios
      .get(`http://localhost:3001/shoppingCart/${userId}`)
      .then((response) => setCartItems(response.data))
      .catch((error) =>
        console.error("There was an error fetching the cart items!", error)
      );
  }, [userId]);

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleAllItems = () => {
    navigate("/allItems");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleNewItem = () => {
    navigate("/newItem");
  };

  return (
    <div className="cartPage">
      <header className="header">
        <img
          src="/nomi-shop-high-resolution-logo-black-transparent.png"
          alt="Nomi Shop Logo"
          className="site-logo"
        />
        <div className="icons">
          <button className="icon-button" id="home" onClick={handleHomeClick}>
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
      <div className="container mt-5">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="row">
            {cartItems.map((item) => (
              <div key={item._id} className="col-md-4">
                <div className="cart-item">
                  <img
                    src={`http://localhost:3001/${item.image}`}
                    alt={item.name}
                    className="img-fluid"
                  />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button className="btn btn-danger">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
