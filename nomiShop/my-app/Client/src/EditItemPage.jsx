import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { UserContext } from "./UserContext";

function EditItemPage() {
  const { user } = useContext(UserContext);
  const { itemId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Fetch item details from the server
    axios
      .get(`http://localhost:3001/item/${itemId}`)
      .then((response) => {
        const item = response.data;
        setName(item.name);
        setPrice(item.price);
        setDescription(item.description);
        setCategory(item.category);
        setImageUrl(item.imageUrl); // Assuming the server sends the image URL
      })
      .catch((error) => console.error("Error fetching item details:", error));
  }, [itemId]);

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

    if (!user) {
      console.error("User not logged in!");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    if (image) formData.append("image", image); // Only append if there's a new image

    axios
      .put(`http://localhost:3001/item/${itemId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("There was an error updating the item!", error);
      });
  };

  return (
    <div className="editItemPage">
      <Header />
      <div className="container mt-5">
        <h2>Edit Item</h2>
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
                Update Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItemPage;
