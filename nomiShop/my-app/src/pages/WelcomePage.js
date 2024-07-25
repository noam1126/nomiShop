import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Our NomiShop</h1>
      <p>Please select your current mode to continue:</p>
      <div className="role-selection">
        <Link to="/seller" className="role-button">Seller</Link>
        <Link to="/buyer" className="role-button">Buyer</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
