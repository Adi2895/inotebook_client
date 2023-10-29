import React , {useContext, useEffect } from 'react'
import noteContext from '../context/noteContext';
import { useParams , useNavigate} from 'react-router-dom'

export default function Showcontent() {
  const navigate = useNavigate();
  
  const {id} = useParams();
  const context = useContext(noteContext);
    const { notes} = context;
    const note = notes.find((note) => note._id === id);

    useEffect(()=>{
      if(localStorage.getItem("token")){ 
        navigate(`/note/${id}`)
      } else {
        navigate("/login")
      }
    })
  return (
    <>
    <div className='container' style={{width:"900px", margin:"0 auto", padding:"10px"}}>
      <h1> Here is your detailed note.</h1>
      <h3>Title: {note.title}</h3>
     
    <h2 className='mb-2'>Description</h2>
    <br/>
    <div >
      <p style={{wordWrap:"break-word"}>{note.description}</p>
      </div>
                </div>
      </>
     )
}
