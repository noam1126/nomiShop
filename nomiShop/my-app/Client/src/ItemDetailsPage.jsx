import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHeart,
  faUser,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./ItemDetailsPage.css"; // Add your CSS styles here

function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/item/${id}`)
      .then((response) => setItem(response.data))
      .catch((error) =>
        console.error("There was an error fetching the item!", error)
      );
  }, [id]);

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  if (!item) return <div>Loading...</div>;

  const imageUrl = `http://localhost:3001/${item.image}`;

  return (
    <div className="itemDetailsPage">
      <header className="header">
        <h1 className="site-title">Nomi shop</h1>
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
          <button className="icon-button" id="search">
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
        <div className="row">
          <div className="col-md-6">
            <img src={imageUrl} alt={item.name} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
