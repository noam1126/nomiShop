// src/Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

const productsData = {
  Furniture: [
    { id: 1, name: 'Sofa', price: '$499', imgSrc: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Coffee Table', price: '$199', imgSrc: 'https://via.placeholder.com/150' }
  ],
  Decor: [
    { id: 3, name: 'Vase', price: '$49.99', imgSrc: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Wall Art', price: '$89.99', imgSrc: 'https://via.placeholder.com/150' }
  ],
  Lighting: [
    { id: 5, name: 'Table Lamp', price: '$79.99', imgSrc: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Chandelier', price: '$299.99', imgSrc: 'https://via.placeholder.com/150' }
  ],
  'Kitchen & Dining': [
    { id: 7, name: 'Dinner Set', price: '$129.99', imgSrc: 'https://via.placeholder.com/150' },
    { id: 8, name: 'Cookware Set', price: '$89.99', imgSrc: 'https://via.placeholder.com/150' }
  ],
  Bedding: [
    { id: 9, name: 'Comforter Set', price: '$99.99', imgSrc: 'https://via.placeholder.com/150' },
    { id: 10, name: 'Pillow Set', price: '$39.99', imgSrc: 'https://via.placeholder.com/150' }
  ]
};

const allProducts = [
  ...productsData.Furniture,
  ...productsData.Decor,
  ...productsData.Lighting,
  ...productsData['Kitchen & Dining'],
  ...productsData.Bedding
];

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const products = selectedCategory === 'All' ? allProducts : productsData[selectedCategory];
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1 className="site-title">NomiShop Online</h1>
        <div className="icons">
          <button className="icon-button">
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <button className="icon-button">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className="icon-button" onClick={handleProfileClick}>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </header>

      {/* Sliding message */}
      <section className="sliding-message">
        <div className="message">🎉 Big Sale! Up to 50% off on selected items! 🎉</div>
      </section>

      {/* Categories Navbar */}
      <nav className="categories-navbar">
        <button className={`nav-item ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => handleCategoryChange('All')}>All</button>
        <button className={`nav-item ${selectedCategory === 'Furniture' ? 'active' : ''}`} onClick={() => handleCategoryChange('Furniture')}>Furniture</button>
        <button className={`nav-item ${selectedCategory === 'Decor' ? 'active' : ''}`} onClick={() => handleCategoryChange('Decor')}>Decor</button>
        <button className={`nav-item ${selectedCategory === 'Lighting' ? 'active' : ''}`} onClick={() => handleCategoryChange('Lighting')}>Lighting</button>
        <button className={`nav-item ${selectedCategory === 'Kitchen & Dining' ? 'active' : ''}`} onClick={() => handleCategoryChange('Kitchen & Dining')}>Kitchen & Dining</button>
        <button className={`nav-item ${selectedCategory === 'Bedding' ? 'active' : ''}`} onClick={() => handleCategoryChange('Bedding')}>Bedding</button>
      </nav>

      {/* Product Showcase */}
      <section className="product-showcase">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.imgSrc} alt={product.name} className="product-image" />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
