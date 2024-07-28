import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProfilePage from "./ProfilePage";
import ItemPage from "./ItemPage";
import ItemsListPage from "./ItemsListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/itemPage" element={<ItemPage />} />
        <Route path="/allItems" element={<ItemsListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
