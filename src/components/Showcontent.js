import React, { useContext, useEffect } from 'react';
import noteContext from '../context/noteContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

export default function Showcontent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const context = useContext(noteContext);
  const { notes } = context;
  var note;

  for (var i = 0; i < notes.length; i++) {
    if (notes[i]._id === id) {
      note = notes[i];
      break;
    }
  }

  // console.log(note)

  if (note) {
    localStorage.setItem('notes', JSON.stringify(note));
  } else {
    // Retrieve note from localStorage if note is not found
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      note = storedNotes;
    }
  }
  // Move useEffect outside of conditional logic
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } 
  }, [navigate]);

  if (!note) return <div className='d-flex justify-content-center text-centre'> <p>...Loading</p></div>;

  

  return (
    <>
    <div style={{fontFamily:"sans-serif", background: "linear-gradient(to bottom, rgb(215 195 216), rgb(192 195 217), rgb(158 158 201))"}}>
      <div className='container'>
        <h1 className='text-center'> Your detailed note.</h1>
        <h4>Title: {note.title}</h4>
        <h3 className='mb-2'>Description</h3>
        <br />
        <div>
          <Editor
            apiKey='7h8nwbh43jf8l3bu92hxc8wwn3udo3emgicx67deep8un4wt'
            initialValue={note.description}
            init={{
              readonly: true, // Set read-only mode
              disabled: true, // Disable editing

            }}
            disabled={true}
          />
          <div style={{ height: "300px" }}></div>
        </div>
      </div>
      </div>
    </>
  );
}
