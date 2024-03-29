import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export default function Navbar(props) {

    let location = useLocation();
    let navigate = useNavigate(); 

    const handleLogout = ()=>{
        localStorage.removeItem('token'); 
        navigate("/login");
    }

    React.useEffect(() => {
        // Google Analytics
    }, [location]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NoteEazy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link  className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link target='_blank' className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about" >About</Link>
                            </li> */}
                        </ul>

                         { !localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/create-note" role="button" >Create Note</Link>
                      
                            <Link className="btn btn-primary mx-1" to="/login" role="button" >Login</Link>
                            <Link className="btn btn-primary mx-1"  to="/signup" role="button" >Sign up</Link>  
                                             
                        </form>:<form className="d-flex">
                         <Link className="btn btn-primary mx-1"  to="/create-note" role="button" >Create Note</Link>
                       
                            <Link className='btn btn-primary'  to="/" role="button" onClick={handleLogout} > Logout </Link>     
                        </form>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
