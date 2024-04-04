import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Userview.css";

const Userview = () => {
  const [userviewData, setUserviewData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/userview")
      .then((res) => {
        setUserviewData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Userview Data</h2>
      <div className="data-container">
        {userviewData.map((data, index) => (
          <div key={index} className="data-box">
            <div className="data-item">
              <strong>Name:</strong> {data.name}
            </div>
            <div className="data-item">
              <strong>Price:</strong> {data.price}
            </div>
            <div className="data-item">
              <strong>Description:</strong> {data.description}
            </div>
            <div className="data-item">
              <strong>Date:</strong> {data.date}
            </div>
            <div className="data-item">
              <strong>Quantity:</strong> {data.quantity}
            </div>
            <div className="data-item">
              <strong>Movement Type:</strong> {data.movementType}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userview;
