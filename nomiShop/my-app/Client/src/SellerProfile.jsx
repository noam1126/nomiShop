import React, { useState } from 'react';
import './SellerProfilePage.css';

const SellerProfilePage = () => {
  const [orders] = useState([
    { id: 1, product: 'Smartphone', date: '2024-01-15', amount: '$499' },
    { id: 2, product: 'Running Shoes', date: '2024-02-20', amount: '$79.99' }
  ]);

  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, Anytown, USA'
  });

  const [products] = useState([
    { id: 1, name: 'Product 1', amount: 10, price: '$50' },
    { id: 2, name: 'Product 2', amount: 5, price: '$30' },
    // Add more products as needed
  ]);

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    alert('Account deleted');
  };

  const handleAddItem = () => {
    // Implement add item logic here
    alert('Add item clicked');
  };

  return (
    <div className="profile-page">
      <h1>Seller Profile Page</h1>
      
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

      <section className="section products-section">
        <h2>My Products for Sale</h2>
        <button className="add-item-button" onClick={handleAddItem}>
          Add Item for Sale
        </button>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <p>Name: {product.name}</p>
              <p>Amount: {product.amount}</p>
              <p>Price: {product.price}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SellerProfilePage;
