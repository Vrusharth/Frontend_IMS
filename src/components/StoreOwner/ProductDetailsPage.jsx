import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = () => {
    axios
      .get(`http://localhost:8081/products`)
      .then((res) => {
        setProductDetails(res.data);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProductDetails = [...productDetails];
    updatedProductDetails[index][name] = value;
    setProductDetails(updatedProductDetails);
  };

  const handleSubmit = (e, index) => {
    e.preventDefault();
    const updatedProduct = productDetails[index];
    axios
      .post(
        `http://localhost:8081/product-details/${productId}`,
        updatedProduct
      )
      .then((res) => {
        console.log(res.data);
        alert("Updated successfully");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <button
        className="back-btn"
        style={{ position: "absolute", top: "10px" }}
        onClick={() => {
          navigate("/home");
        }}
      >
        Back
      </button>

      <h2>Product Details</h2>
      <div className="product-details-container">
        {productDetails.map((product, index) => (
          <div key={index} className="product-details-item">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <form onSubmit={(e) => handleSubmit(e, index)}>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={product.date}
                onChange={(e) => handleChange(e, index)}
              />
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={(e) => handleChange(e, index)}
              />
              <label>Type of Movement:</label>
              <select
                name="movementType"
                value={product.movementType}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="GR">Goods Receipt</option>
                <option value="GI">Goods Issue</option>
                <option value="TP">Transfer Posting</option>
                <option value="ST">Stock Transfer</option>
                <option value="RD">Return Delivery</option>
              </select>
              <button type="submit">Update</button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDetailsPage;
