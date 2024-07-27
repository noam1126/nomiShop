import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [orders] = useState([
    { id: 1, product: 'Smartphone', date: '2024-01-15', amount: '$499' },
    { id: 2, product: 'Running Shoes', date: '2024-02-20', amount: '$79.99' }
  ]);

  const [userDetails, setUserDetails] = useState({
    name: 'Mil Seg',
    email: 'miliseg12@example.com',
    address: 'Moshe Dayan 93 St, Holon, Israel'
  });

  const handleDeleteAccount = () => {
    alert('Account deleted');
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      
      <section className="section orders-section">
        <h2>My Past Orders</h2>
        <ul>
          {orders.map(order => (
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
