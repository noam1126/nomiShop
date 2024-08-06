import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { UserContext } from "./UserContext";
import Header from "./Header";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Add console logs for debugging
  console.log("User context:", user);

  if (!user) {
    // Navigate to login if user is not defined
    useEffect(() => {
      navigate("/login");
    }, [navigate]);
    return null;
  }

  const userId = user._id;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3001/shoppingCart/${userId}`)
        .then((response) => setCartItems(response.data))
        .catch((error) =>
          console.error("There was an error fetching the cart items!", error)
        );
    }
  }, [userId]);

  return (
    <div className="cartPage">
      <Header />
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
