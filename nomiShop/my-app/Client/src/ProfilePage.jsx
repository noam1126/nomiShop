// src/ProfilePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = ({ user }) => {
  const [orders] = useState([
    { id: 1, product: 'Smartphone', date: '2024-01-15', amount: '$499' },
    { id: 2, product: 'Running Shoes', date: '2024-02-20', amount: '$79.99' }
  ]);

  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
    address: 'Moshe Dayan 93 St, Holon, Israel'
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:3001/deleteUser/${user._id}`);
      navigate('/signup'); // Redirect to signup or login page after deletion
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
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
        <button className="delete-button" onClick={() => setShowConfirmDialog(true)}>
          Delete Account
        </button>
      </section>

      {showConfirmDialog && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <button onClick={handleDeleteAccount}>Yes, Delete</button>
          <button onClick={() => setShowConfirmDialog(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
