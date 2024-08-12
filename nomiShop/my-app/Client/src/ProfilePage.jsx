import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import Header from "./Header";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    buyerOrSeller: "",
  });
  const [itemsForSale, setItemsForSale] = useState([]);

  // useEffect(() => {
  //   if (user && user.email) {
  //     axios
  //       .get(`http://localhost:3001/user/${user.email}`)
  //       .then((response) => {
  //         setUserDetails(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("There was an error fetching the user details!", error);
  //       });

  //     if (user.buyerOrSeller === "seller") {
  //       axios
  //         .get(`http://localhost:3001/itemsForSale/${user._id}`)
  //         .then((response) => {
  //           setItemsForSale(response.data);
  //         })
  //         .catch((error) => {
  //           console.error(
  //             "There was an error fetching the items for sale!",
  //             error
  //           );
  //         });
  //     }
  //   }
  // }, [user]);

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (user && user.email) {
      axios
        .get(`http://localhost:3001/user/${user.email}`)
        .then((response) => {
          setUserDetails(response.data);
          console.log("User details fetched:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });

      if (user.buyerOrSeller === "seller") {
        console.log("Fetching items for sale for user:", user._id);
        axios
          .get(`http://localhost:3001/itemsForSale/${user._id}`)
          .then((response) => {
            setItemsForSale(response.data);
            console.log("Items for sale fetched:", response.data);
          })
          .catch((error) => {
            console.error("Error fetching items for sale:", error);
          });
      }
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

  return (
    <div className="profile-page">
      <Header />
      <h1>Hi, {userDetails.name}</h1>

      <section className="section orders-section">
        <h2>My Past Orders</h2>
        <ul>
          {userDetails.orders &&
            userDetails.orders.map((order) => (
              <li key={order.id}>
                <p>Product: {order.product}</p>
                <p>Date: {order.date}</p>
                <p>Amount: {order.amount}</p>
              </li>
            ))}
        </ul>
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

          <section className="items-for-sale">
            <h2>My Items for Sale</h2>
            <h2>{itemsForSale.length}</h2>
            <ul>
              {itemsForSale.length > 0 ? (
                itemsForSale.map((item) => (
                  <li key={item._id}>
                    <p>Product: {item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Description: {item.description}</p>
                  </li>
                ))
              ) : (
                <p>No items for sale.</p>
              )}
            </ul>
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
