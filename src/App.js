import './App.css'
// import About from './components/About';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import { useState } from 'react';
import ForgotPassword from './components/ForgotPassword';
import EnterOTP from './components/EnterOTP';
import SetPassword from './components/SetPassword'
import Showcontent from './components/Showcontent';
import LandingPage from './components/LandingPage';
 
function App() {

  const [alert , setAlert] = useState(null);

  const showAlert = (message , type)=>{
    setAlert({
      msg:message, 
      type:type
    })     

    setTimeout(()=>{
      setAlert(null);
    } , 1000);
  }

  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          {/* <div className=""> */}
            <Routes>
              <Route exact path="/create-note" element={<Home showAlert={showAlert}/>}/>

              {/* <Route exact path="/about" element={<About />}/> */}
                
              <Route exact path="/login" element={<Login showAlert={showAlert} />}/>

              <Route exact path="/" element={<LandingPage showAlert={showAlert} />}/>

              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
              
              <Route exact path="/resetpassword" element={<ForgotPassword showAlert={showAlert}/>}/>

              <Route exact path="/enter-otp" element={<EnterOTP showAlert={showAlert}/>}/>
              
              <Route exact path="/setpassword" element={<SetPassword showAlert={showAlert}/>}/>
            
              <Route exact path="/note/:id" element={<Showcontent showAlert={showAlert}/>}/>
            </Routes>
          {/* </div> */}
         
        </Router>
      </NoteState>
    </>
  );
}
export default App;