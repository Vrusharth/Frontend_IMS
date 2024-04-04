import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productdashboard.css";
import { useNavigate } from "react-router-dom";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from backend upon component mount
    axios
      .get("http://localhost:8081/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleRemoveProduct = (productId) => {
    axios
      .delete(`http://localhost:8081/products/${productId}`)
      .then((res) => {
        console.log(res.data);
        // Remove the deleted product from the products state
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2>Product DashBoard</h2>
      <button
        className="back-btn"
        onClick={() => {
          navigate("/home");
        }}
      >
        Back
      </button>

      <div className="product-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>

            <button
              className="remove-button"
              onClick={() => handleRemoveProduct(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDashboard;
