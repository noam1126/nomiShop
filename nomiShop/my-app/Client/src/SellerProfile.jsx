import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SellerProfile.css';

const SellerProfilePage = () => {
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch user details, orders, and products
  useEffect(() => {
    const userId = '66a65e82f08709b07acbe119'; // Replace with actual userId logic

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/orders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/allItems`);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchUserDetails();
    fetchOrders();
    fetchProducts();
  }, []);

  const handleDeleteAccount = async () => {
    if (!userDetails || !userDetails._id) {
      console.error('User details are missing or invalid.');
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/deleteUser/${userDetails._id}`);
      navigate('/register'); // Redirect to registration page after deletion
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  const handleAddItem = () => {
    navigate('/newItemPage'); // Navigate to the NewItemPage
  };

  if (!userDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Hi, {userDetails.name}</h1>
        <button className="delete-button" onClick={() => setShowConfirmDialog(true)}>
          Delete Account
        </button>
      </header>

      <section className="section details-section">
        <h2>My Details</h2>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Address:</strong> {userDetails.address}</p>
      </section>

      <section className="section orders-section">
        <h2>My Past Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <p><strong>Product:</strong> {order.product}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Amount:</strong> {order.amount}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section products-section">
        <h2>My Products for Sale</h2>
        <button className="add-item-button" onClick={handleAddItem}>
          Add Item for Sale
        </button>
        <div className="product-list">
          {products.length > 0 ? (
            products.map(product => {
              const imageUrl = `http://localhost:3001/uploads/${product.image}`; // Adjust path as necessary
              return (
                <div key={product._id} className="product-item">
                  <img src={imageUrl} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">Price: ${product.price}</p>
                    <p className="product-description">{product.description}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products available</p>
          )}
        </div>
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

export default SellerProfilePage;
