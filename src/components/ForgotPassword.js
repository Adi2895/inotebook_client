import React, { useEffect, useState } from 'react'
import "./style/signup.css";

import book from "./static/Enter-OTP.jpg"
import { useNavigate} from 'react-router-dom';
export default function ForgotPassword(props) {

const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")){ 
      navigate(`/`)
    } 
  })
   
    const [credentials, setCredentials] = useState({email: ""})

     // OTP generate routing get called 
  const handleSubmit = async(e)=>{
   
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/auth/otpgenerate?email=${credentials.email}`,
    {              
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          }
      });
      
      const json = await response.json();
      
      if(response.status === 200) {
        props.showAlert(`OTP has been sended at ${credentials.email} Successfully`, "success")
        navigate("/enter-otp")
      } else {
         
          props.showAlert(json.msg, "danger")
      }
  }


  const onChange = (e)=>{
    setCredentials({...credentials , [e.target.name] : e.target.value});
}


  
  
  
    return (
      <div className="container">  
<div className=" row sign-up d-flex justify-content-center">
      
      <div className="col-md-4 col-lg-4 signup_image_side">
        
        <p className="mt-3 mb-5 secure_sentense"> Let's Get Started.</p>           
        <div className="container_book_sign">
        <img className="book_sign" alt="" srcSet={book}/>
        </div>
      </div>


<form  className="form-horizontal col-md-8 col-lg-8 d-flex justify-content-center signup_register_part " action='' method="POST" onSubmit={handleSubmit}>
<fieldset style={{marginTop:"115px"}}  className=''>
<div id="legend">
  <legend className="">Please Verify your email</legend>
</div>


<div className="control-group mb-4">
  {/* <!-- E-mail --> */}
  <label className="control-label" for="email">E-mail</label>
  <div className="controls">
    <input style={{borderRadius:"5px", height:"48px"}} onChange={onChange} value={credentials.email} type="email"  id="email" name="email" placeholder="user@gmail.com" className="input-xlarge" required/>
      </div>
</div>
  {/* <!-- Button --> */}
  <div className="controls d-flex justify-content-center mb-2">
    <button className="btn btn-lg btn-primary " onClick={handleSubmit}type='submit'>Send OTP</button>
  </div>


</fieldset >

</form>


  

</div>
</div>
  )
}
