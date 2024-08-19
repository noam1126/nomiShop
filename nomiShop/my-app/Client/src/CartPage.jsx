import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { UserContext } from "./UserContext";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  if (!user) {
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

  const handleRemoveItem = (itemId) => {
    axios
      .delete(`http://localhost:3001/shoppingCart/${userId}/${itemId}`)
      .then(() => {
        setCartItems(cartItems.filter((item) => item._id !== itemId));
      })
      .catch((error) => {
        console.error(
          "There was an error removing the item from the cart!",
          error
        );
      });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    axios
      .put(`http://localhost:3001/shoppingCart/${userId}/${itemId}`, {
        quantity: newQuantity,
      })
      .then(() => {
        setCartItems(
          cartItems.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      })
      .catch((error) =>
        console.error("There was an error updating the item quantity!", error)
      );
  };

  const handleOrderCart = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      userId: userId,
      items: cartItems,
      date: new Date().toISOString(),
      status: "Pending", // Status field to track the order state
    };

    axios
      .post("http://localhost:3001/orders", orderData)
      .then((response) => {
        setOrderPlaced(true);
        alert("Order placed successfully!");
        setCartItems([]); // Clear the cart after placing the order
      })
      .catch((error) => {
        console.error("Error placing the order:", error);
        alert("There was an issue placing your order. Please try again.");
      });
  };

  return (
    <div className="cartPage">
      <Header />
      <div className="container mt-5">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
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
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <button className="btn order-button" onClick={handleOrderCart}>
        Place Order
      </button>
      {orderPlaced && <p>Your order has been placed!</p>}
    </div>
  );
}

export default CartPage;
