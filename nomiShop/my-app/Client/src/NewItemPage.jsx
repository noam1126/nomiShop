import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faUser,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function NewItemPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    axios
      .post("http://localhost:3001/newItemPage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        // Reset form
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage(null);
        setImageUrl("");
      })
      .catch((error) => {
        console.error("There was an error uploading the item!", error);
      });
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleAllItems = () => {
    navigate("/allItems");
  };

  return (
    <div className="newItemPage">
      <header className="header">
        <img
          src="/nomi-shop-high-resolution-logo-black-transparent.png"
          alt="Nomi Shop Logo"
          className="site-logo"
        />
        <div className="icons">
          <button className="icon-button" id="home" onClick={handleHomeClick}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button className="icon-button" id="shoppingCart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
          <button className="icon-button" id="heart">
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button className="icon-button" id="search" onClick={handleAllItems}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            className="icon-button"
            id="userProfile"
            onClick={handleProfileClick}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </header>
      <div className="container mt-5">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              {imageUrl ? (
                <img src={imageUrl} alt="Item" className="img-fluid" />
              ) : (
                <div className="border p-5 d-flex justify-content-center align-items-center">
                  <span>No image selected</span>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageUpload}
                className="form-control mt-2"
              />
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-control"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="home">Home</option>
                  <option value="books">Books</option>
                  <option value="toys">Toys</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Add Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NewItemPage;
