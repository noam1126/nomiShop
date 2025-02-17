import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProfilePage from "./ProfilePage";
import ItemDetailsPage from "./ItemDetailsPage";
import ItemsListPage from "./ItemsListPage";
import NewItemPage from "./NewItemPage";
import { UserProvider } from './UserContext';


function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/newItemPage" element={<NewItemPage />} />
        <Route path="/allItems" element={<ItemsListPage />} />
        <Route path="/item/:id" element={<ItemDetailsPage />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
