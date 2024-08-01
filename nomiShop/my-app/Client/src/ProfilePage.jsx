import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import Header from './Header';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    buyerOrSeller: '', // This field indicates if the user is a buyer or seller
    itemsForSale: [] // List of items for sale if user is a seller
  });

  useEffect(() => {
    if (user && user.email) {
      axios.get(`http://localhost:3001/user/${user.email}`)
        .then(response => {
          setUserDetails(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the user details!", error);
        });
    }
  }, [user]);

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      axios.delete(`http://localhost:3001/user/${user.email}`)
        .then(() => {
          alert('Account deleted');
          window.location.href = '/register';
        })
        .catch(error => {
          console.error("There was an error deleting the account!", error);
        });
    }
  };

  const handleAddNewItem = () => {
    window.location.href = '/newItemPage'; // Redirect to add new item page
  };

  return (
    <div className="profile-page">
      <Header /> {/* Include the Header component */}
      <h1>Hi, {userDetails.name}</h1>
      
      <section className="section orders-section">
        <h2>My Past Orders</h2>
        <ul>
          {userDetails.orders && userDetails.orders.map(order => (
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
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Address:</strong> {userDetails.address}</p>
      </section>

      {userDetails.buyerOrSeller === 'seller' && (
        <section className="section seller-section">
          <button className="add-item-button" onClick={handleAddNewItem}>
            Add New Item for Sale
          </button>

          <section className="items-for-sale">
            <h2>My Items for Sale</h2>
            <ul>
              {userDetails.itemsForSale && userDetails.itemsForSale.map(item => (
                <li key={item._id}>
                  <p>Product: {item.name}</p>
                  <p>Price: ${item.price}</p>
                  <p>Description: {item.description}</p>
                </li>
              ))}
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
