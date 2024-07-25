import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import SellerDashboard from './pages/SellerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
