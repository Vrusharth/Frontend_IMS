import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import "./signup.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();

  // const [error, setError] = useState(null);
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setError(Validation(values));
    if (error.email === "" && error.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/home");
          } else {
            alert("Please Create Account");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="box">
      <div className="container">
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onChange={handleInput}
          ></input>
          <input
            type="password"
            placeholder="Enter Pass"
            name="password"
            onChange={handleInput}
          ></input>
          <button type="submit">Login</button>
        </form>
        <p className="link">
          <Link to={"/signup"}>Create New Account</Link>
        </p>
        {error && <h2>{error.message}</h2>}
      </div>
    </div>
  );
};

export default Login;
