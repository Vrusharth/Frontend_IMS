import React, { useState } from "react";
import axios from "axios";
import "./productdashboard.css";
import "./ProductForm.css";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const { productId } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8081/products/${productId}`, formData)
      .then((res) => {
        console.log(res.data);
        navigate("/productdashboard");
        // Reset form after successful submission
        setFormData({ name: "", price: "", description: "" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="background">
      <h2>Create/Update Product</h2>
      <button
        className="back-btn"
        onClick={() => {
          navigate("/home");
        }}
      >
        Back
      </button>
      <div>
        <form onSubmit={handleSubmit} className="form-container ">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Product Price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
