import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { UserContext } from "./UserContext";
import "./ItemDetailsPage.css";

function ItemDetailsPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/item/${id}`)
      .then((response) => setItem(response.data))
      .catch((error) =>
        console.error("There was an error fetching the item!", error)
      );
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      console.error("User not logged in!");
      return;
    }
    const userId = user._id;
    axios
      .post("http://localhost:3001/shoppingCart", { userId, item })
      .then((response) => {
        console.log("Item added to cart:", response.data);
        navigate("/shoppingCart");
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart!", error);
      });
  };

  if (!item) return <div>Loading...</div>;

  const imageUrl = `http://localhost:3001/${item.image}`;

  return (
    <div className="itemDetailsPage">
      <Header />
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
