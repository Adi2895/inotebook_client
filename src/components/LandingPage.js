import React from 'react'
import "./style/Landing.css"
import { Link } from 'react-router-dom'

import Footer from './Footer';

export default function LandingPage() {
    

    var qualities = [{ sign: <i className="fas fa-thumbs-up"></i> , heading: "Friendly-Interface", sub_heading: "The interface has been meticulously crafted with the user's convenience in mind." },
    { sign: <i class="fas fa-sort-amount-up"></i>, heading: ` Work together`, sub_heading: "Share a to-do list, post some instructions, or publish your notes online." },
    { sign:<i class="fa-brands fa-free-code-camp"></i>, heading: "Free Usability", sub_heading: "Creatign notes on this is absolutely free" },
    { sign:<i class="fa-brands fa-accessible-icon"></i> ,  heading: "Easy Access", sub_heading: "The user can access their created notes quite easily."  },
    { sign:<i class="fa-solid fa-shield"></i> ,  heading: "Security", sub_heading: "Your notes are highly secure, so you need not worry too much." },
    { sign:<i class="fa-solid fa-table-list"></i> ,  heading: "Maintenance", sub_heading: "We are trying our best to facilitate." }];
  return (
    <>
    <div className="container_landing">
    <div className="container container_landing ">  
    <div className=' row landing container d-flex justify-content-center text-align-center'>

         <div className=' row con_heading mb-5'>   
        <h1  className='text-center heading'>The Easiest way to</h1>
        <h1 className='text-center heading mx-3'> secure notes</h1>
        <p className='text-center pb-3 my-3 mx-3'>Crafting notes-making websites is like building digital gardens where ideas blossom and productivity flourishes, cultivating a space for creativity to thrive and achievements to blossom.</p>
              
            
        <div className='text-center '>      
            { localStorage.getItem("token") ? 
        (<Link to="create-note" target='_blank' className='changable text-center btn btn-primary'> Create Note</Link>) 
        : (<Link to="/signup" target='_blank' className='changable text-center btn btn-primary'> Sign up now</Link>)
        }
        </div>
        </div>
      
        
        <div className='row mb-5 mt-5 text-center comprehensive'>
                <h1 className='mb-5' style={{fontWeight:"bolder"}}>Qualities that noteeazy have</h1>
          
                {qualities.map((obj)=>(
                <div className='col-md-4 my-3'>
                 <h3  className='head_ text-centre '>  <span > {obj.sign} </span>  {obj.heading}</h3> 
                  <p className='sub_heading' >{obj.sub_heading}</p>
                </div>
             ))}
                
        </div>
    </div>
      </div>
      </div>
      <Footer/>
    </>
  )
}
