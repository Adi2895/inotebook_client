import React, { useState,useEffect } from "react";
import "./style/signup.css";

import book from "./static/black_book.avif"
import { Link, useNavigate } from "react-router-dom";
const baseUrl = process.env.REACT_APP_BASE_URL;

const Login = (props) => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [eyePass, seteyePass] = useState("fa-solid fa-eye");

  const [visiblepass, setVisiblepass] = useState("password");

  const eyePassfun = () => {
    
    if (eyePass === "fa-solid fa-eye") {
      setVisiblepass("text");
      seteyePass("fas fa-eye-slash");
    } else {
      setVisiblepass("password");
      seteyePass("fa-solid fa-eye");
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(()=>{
      if(localStorage.getItem("token")){
          navigate("/");
      } 
  }, [])
/* eslint-disable react-hooks/exhaustive-deps */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/api/auth/login`, {
    
   
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.success === false) {
      props.showAlert("Invalid Credentials", "danger");
    } else {
      props.showAlert("You logged Successfully", "success");

      localStorage.setItem("token", json.authToken);
      navigate("/");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="container">  
      <div className=" row sign-up d-flex justify-content-center">
      <div className="col-md-4 col-lg-4 signup_image_side">
        
        <p className="mt-3 mb-5 secure_sentense"> Let's Get Started.</p>           
        <div className="container_book_sign">
        <img className="book_sign" srcSet={book}/>
        </div>
      </div>


        <form onSubmit={handleSubmit} className="form-horizontal col-md-8 col-lg-8 signup_register_part">
                
              <br/>
              <h1   className="legend">Login Now</h1>
            

                <div className="form-outline mb-4">
                  <label  htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    className="form-control form-control-lg"
                    onChange={onChange}
                    placeholder="Enter a valid email address"
                    required
                  />
                </div>

                <div className="form-outline mb-1">
                  <label  htmlFor="password">
                    Password
                  </label>
                  <small style={{ float: "right" }}>
                    <i onClick={eyePassfun} className={eyePass}></i>
                  </small>
                </div>
                <input
                  type={visiblepass}
                  id="password"
                  name="password"
                  value={credentials.password}
                  className="form-control form-control-lg"
                  onChange={onChange}
                  placeholder="Enter password"
                  required
                />

                <div className="d-flex justify-content-between align-items-center">
                  <div className="mt-2">
                    <Link
                      to="/resetpassword"
                      style={{ color: "red", textDecoration: "none" }}
                      className=""
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className="controls d-flex justify-content-center mt-4 mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary register_btn"
                    // style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                 
                </div>

                <div className="mb-3">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have any account?
                    <Link to="/signup" className="link-danger">
                      Register
                    </Link>
                  </p>
                </div>

               
        <br/>
        <br/>
        <br/>
        
        </form>


       
         
          </div>
          </div>
    </>
  );
};

export default Login;
