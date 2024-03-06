import React, { useState , useEffect } from "react";
import "./style/signup.css";
import book from "./static/1238w-WKieQj6vCN4.webp"
import { useNavigate, Link } from "react-router-dom";
const baseUrl = process.env.REACT_APP_BASE_URL;

const Signup = (props) => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token"))
      navigate("/") 
  })

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err1, seterr1] = useState("");
  const [err2, seterr2] = useState("");
  const [err3, seterr3] = useState("");
  const [notEqual, setnotEqual] = useState("");
  const [eyePass, seteyePass] = useState("fa-solid fa-eye");
  const [eyeConfirm, seteyeConfirm] = useState("fa-solid fa-eye");
  const [visiblepass, setVisiblepass] = useState("password");
  const [visibleconfirm, setVisibleconfirm] = useState("password");
  

  const eyePassfun = () => {
    if (eyePass === "fa-solid fa-eye") {
      setVisiblepass("text");
      seteyePass("fas fa-eye-slash");
    } else {
      setVisiblepass("password");
      seteyePass("fa-solid fa-eye");
    }
  };

  const eyeConfirmfun = () => {
    if (eyeConfirm === "fa-solid fa-eye") {
      setVisibleconfirm("text");
      seteyeConfirm("fas fa-eye-slash");
    } else {
      setVisibleconfirm("password");
      seteyeConfirm("fa-solid fa-eye");
    }
  };

  function isValidEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
}

  const handleSubmit = async (e) => {
   
    e.preventDefault();

    var check = true;
    if(true){

    if (credentials.name === "") {
      setTimeout(()=>{
        seterr1("");
      },2000)
      seterr1("Name Is Required");
      check = false;
    } else {
      seterr1("");
      
    }
    if (credentials.email === "" || !isValidEmail(credentials.email)) {
      setTimeout(()=>{
        seterr2("");
      },2000)
      seterr2("Invalid Email");
      check = false;      
    } else {
      seterr2("");
      
    }
    if (credentials.password === "" ) {
      setTimeout(()=>{
        seterr3("");
      },2000)
      seterr3("Password Is Required");
      check = false;
 
    } else 
      seterr3("");
    
    if(check === false) return;
}



    if (credentials.password === credentials.confirmPassword) {
      
      const response = await fetch(`${baseUrl}/api/auth/createuser`, {
         
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      
      const json = await response.json();
      console.log(response);

      // alert(response.status)
      if (response.status === 500 || response.status === 400) {
        if (response.status === 500) {
          props.showAlert("Please fill the required details.", "danger");
        } else {
          props.showAlert(json.error, "danger");
        }
      } else {
        props.showAlert(
          `Great! ${credentials.name}, You registered Successfully`,
          "primary"
        );
        navigate("/login");       
      }
    } else {
      setTimeout(() => {
        setnotEqual("");
      }, 2000);
      setnotEqual("Please confirm the password");
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
          
            <p className="mt-3 mb-5 secure_sentense"> Secure Your Notes by connecting with us</p>           
            <div className="container_book_sign">
            <img className="book_sign" srcSet={book}/>
            </div>
          </div>

        <form className="form-horizontal col-md-8 col-lg-8 signup_register_part"
          action=""
          method="POST"
          onSubmit={handleSubmit}
        >
          <fieldset>
           <br/>
              <h1   className="legend">Create Account</h1>
            

            {/* name */}
                      <div className="mb-3">
                        <div class="form-group">
                          <label>First name</label>
                      <input
                      type="text"
                      onChange={onChange}
                      className="form-control"
                      name="name"
                      id=""
                      aria-describedby="emailHelpId"
                      placeholder="Name"
                      required
                  />
                      <small
                          style={{ color: "red" }}
                          id="emailHelpId"
                          className="form-text"
                      >
                          {err1}
                      </small>
                      </div>
                      </div>




            {/* email */}
                  <div className="mb-3">
                    <label >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={onChange}
                      className="form-control"
                      name="email"
                      id=""
                      aria-describedby="emailHelpId"
                      placeholder="abc@mail.com"
                      required
                    />
                    <small
                      style={{ color: "red" }}
                      id="emailHelpId"
                      className="form-text "
                    >
                      {err2}
                    </small>
                  </div>

            {/* password */}
                    <div className="mb-3">
                      <label>
                        Password
                      </label>
                      <span style={{ float: "right" }}>
                        <i onClick={eyePassfun} className={eyePass}></i>
                      </span>
                      <input
                        type={visiblepass}
                        onChange={onChange}
                        className="form-control"
                        name="password"
                        id=""
                        aria-describedby="emailHelpId"
                        placeholder="Enter password"
                        required
                      />

                      <small
                        style={{ color: "red" }}
                        id="emailHelpId"
                        className="form-text"
                      >
                        {err3}
                      </small>
                    </div>

            {/* confirm password */}
            <div className="mb-3">
              <label >
                Confirm Password
              </label>
              <span style={{ float: "right" }}>
                <i onClick={eyeConfirmfun} className={eyeConfirm}></i>
              </span>
              <input
                type={visibleconfirm}
                onChange={onChange}
                className="form-control"
                name="confirmPassword"
                id=""
                aria-describedby="emailHelpId"
                placeholder="Enter password"
                required
              />
              <small
                id="confirmpass"
                style={{ color: "red" }}
                className="form-text mb-2"
              >
                {notEqual}{" "}
              </small>
            </div>

            {/* <!-- Button --> */}
            <div className="controls d-flex justify-content-center mt-4 mb-3">
              <button
                className="btn btn-primary register_btn"
                onClick={handleSubmit}
                type="submit"
              >
                Register 
              </button>
            </div>
          </fieldset>
          <div className="mb-3"> 
          
            <Link to="/login" className="text-decoration-none ">
              Already have an account? Login.
            </Link>
          </div>

          

            <div className="container mb-4">
              <div className="d-flex justify-content-center">
            _______________ OR _______________
              </div>
              </div>        

         
          {/* <br/> */}
          <div className="container my-3">
              <div className="d-flex justify-content-center">
            <button className="mx-3 direct_sign">
            <i style={{color:"black"}} class="fa-brands fa-facebook-f"></i>
              &nbsp; Sign up with Facebook
            </button>
            <button className="mx-3 direct_sign">
            <i style={{color:"black"}} class="fa-brands fa-google"></i> Sign up with Google
            </button>
              </div>
              </div> 
        </form>


       
      </div>
      </div>

    </>
  );
};
export default Signup;
