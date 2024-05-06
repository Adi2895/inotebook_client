import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style/EnterOTP.css';

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function EnterOTP(props) {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ OTP: '' });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate(`/`);
    }
  }, [navigate]);

  const handleChange = (index, value) => {

    const newInfo = { ...info };
    newInfo.OTP = newInfo.OTP.substring(0, index) + value + newInfo.OTP.substring(index + 1);
    setInfo(newInfo);
  
    // Focus on the next input if a character is entered or the backspace key is pressed
    if ((value && index < 5) || (!value && index > 0)) {
      const nextIndex = value ? index + 1 : index - 1;
      const nextInput = document.getElementById(`input_${nextIndex}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  ;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/api/auth/otpverify?otp=${info.OTP}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.status === 200) {
      props.showAlert(`OTP has been verified Successfully`, 'primary');
      navigate('/setpassword');
    } else {
      props.showAlert(json.msg, 'danger');
    }
  };

  return (
    <div className=' mt-3 OTP_cotainer'>
    <div className="container">  
    <div className="Enter_OTP row sign-up d-flex justify-content-center">
    
      <div  className='text-center mb-3'>
          <h3 >Enter the OTP to get verified.</h3>
        </div>  

      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            id={`input_${index}`}
            className="input_otp text-center"
            key={index}
            type="tel" // Change input type to "tel"
            maxLength="1"
            value={info.OTP[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
      </form>
      <div></div>
      <br />
      <br />
      <Link className="text-decoration-none my-3" to="/resetpassword">
        Didn't get OTP? Send OTP again
      </Link>
      {/* <h2>{info.OTP}</h2> */}
    
      <button type="submit" onClick={handleSubmit} className="btn btn-primary text-center">
        Submit
      </button>
    </div>
    </div>
    </div>
  );
}
