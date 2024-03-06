import React from 'react'
import {Link} from 'react-router-dom'
export default function Footer() {


    function mouseover(e) {
        e.target.style.color = "pink"
    }

    function mouseout(e) {
        e.target.style.color = "blue"
    }

    return (
        <>
        <div style={{ backgroundColor: "black"}}>
     

            <div className='' style={{ textAlign:"center",   }} >
                

            <div style={{paddingTop:"200px"}} className=" row social-icons mb-4  mx-5 text-align-between" >
                <div className='mb-3'>
                    <Link target='_blank' style={{color:"white"}} className='pb-3 mx-4 text-decoration-none'  >
                    Home
                    </Link>
                    <Link target='_blank' to="create-note" style={{color:"white"}} className='pb-3 text-decoration-none'  >
                    Create Note
                    </Link>
                    </div>
                    
                    
                </div>

                
                
                <div className="social-icons" >
                
                    <Link to= "https://www.linkedin.com/in/adi2/" target='_blank' style={{ textDecoration: "none" }}>
                        <i onMouseOver={mouseover} onMouseOut={mouseout} style={{ color: "white" }} className="fab fa-linkedin fa-xl mx-2"></i>
                    </Link>

                    <Link to= "https://twitter.com/AdityaJ1715144" target='_blank' style={{ textDecoration: "none" }}>
                        <i onMouseOver={mouseover} onMouseOut={mouseout} style={{ color: "white" }} className="fab fa-twitter fa-xl mx-2"></i>
                    </Link>

                    <Link to= "https://www.instagram.com/jangra_aditya1/" target='_blank' className="social-icon" style={{ textDecoration: "none" }}>
                        <i onMouseOver={mouseover} onMouseOut={mouseout} className="fab fa-instagram fa-xl mx-2"></i>


                    </Link>

                    <h4 style={{ color: "white", fontSize: "0.9rem", letterSpacing: "4px", paddingTop: "20px" }} className="footer-text">
                        ©<span id="date">2023</span>
                        <span className="company"><Link to= "/" style={{ textDecoration: "none" }} target="_blank"> ADITYA </Link></span>
                        ALL RIGHTS RESERVED
                    </h4>
                </div>
            </div>
            </div>
        </>
    )
}