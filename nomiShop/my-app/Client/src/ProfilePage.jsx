import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import Header from "./Header";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    buyerOrSeller: "",
  });
  const [itemsForSale, setItemsForSale] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`http://localhost:3001/user/${user.email}`)
        .then((response) => {
          setUserDetails(response.data);

          if (response.data.buyerOrSeller === "seller") {
            axios
              .get(`http://localhost:3001/itemsForSale/${response.data._id}`)
              .then((itemsResponse) => {
                setItemsForSale(itemsResponse.data);
              })
              .catch((error) => {
                console.error("Error fetching items for sale:", error);
              });
          }

          axios
            .get(`http://localhost:3001/orders/${response.data._id}`)
            .then((ordersResponse) => {
              setPastOrders(ordersResponse.data);
            })
            .catch((error) => {
              console.error("Error fetching past orders:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [user]);

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete(`http://localhost:3001/user/${user.email}`)
        .then(() => {
          alert("Account deleted");
          navigate("/register");
        })
        .catch((error) => {
          console.error("There was an error deleting the account!", error);
        });
    }
  };

  const handleAddNewItem = () => {
    navigate("/newItemPage");
  };

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  const handleEditItem = (itemId) => {
    navigate(`/editItem/${itemId}`);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`http://localhost:3001/item/${itemId}`)
        .then(() => {
          setItemsForSale(itemsForSale.filter((item) => item._id !== itemId));
          alert("Item deleted");
        })
        .catch((error) => {
          console.error("There was an error deleting the item!", error);
        });
    }
  };

  return (
    <div className="profile-page">
      <Header />
      <h1>Hi, {userDetails.name}</h1>

      <section className="section orders-section">
        <h2>My Past Orders</h2>
        {pastOrders.map((order) => (
          <div key={order._id} className="order-item">
            <h3>
              Order placed on: {new Date(order.date).toLocaleDateString()}
            </h3>
            <div className="order-products">
              {order.items.map((item) => {
                const imageUrl = `http://localhost:3001/${item.image}`;
                console.log(imageUrl);
                return (
                  <div key={item._id} className="order-product-item">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      className="order-product-image"
                    />
                    <div className="order-product-info">
                      <p className="order-product-name">{item.name}</p>
                      <p className="order-product-price">
                        Price: ${item.price} Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="section details-section">
        <h2>My Details</h2>
        <p>
          <strong>Name:</strong> {userDetails.name}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
      </section>

      {userDetails.buyerOrSeller === "seller" && (
        <section className="section seller-section">
          <button className="add-item-button" onClick={handleAddNewItem}>
            Add New Item for Sale
          </button>

          <section className="product-showcase">
            <h2>My Items for Sale</h2>
            <div className="product-list">
              {itemsForSale.length > 0 ? (
                itemsForSale.map((item) => {
                  const imageUrl = `http://localhost:3001/${item.image}`;
                  return (
                    <div
                      key={item._id}
                      className="product-item"
                      onClick={() => handleItemClick(item._id)}
                    >
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="product-image"
                      />
                      <div className="product-info">
                        <p className="product-name">{item.name}</p>
                        <p className="product-price">Price: ${item.price}</p>
                        <p className="card-text">{item.description}</p>
                        <div className="item-actions">
                          <button
                            className="edit-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditItem(item._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="delete-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteItem(item._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No items for sale.</p>
              )}
            </div>
          </section>
        </section>
      )}

      <section className="section delete-section">
        <h2>Delete Account</h2>
        <button className="delete-button" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </section>
    </div>
  );
};

export default ProfilePage;
