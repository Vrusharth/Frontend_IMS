import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import axios from "axios";
import "./signup.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setError(Validation(values));
    if (error.name === "" && error.email === "" && error.password === "") {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="box">
      <div className="container">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            onChange={handleInput}
          ></input>
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

          <button type="submit">Sign UP Buddy</button>
        </form>
        <p className="link">
          <Link to={"/"}>Already Have An Account? Login</Link>
        </p>
        {error && <h2>{error.message}</h2>}
      </div>
    </div>
  );
};

export default Signup;
