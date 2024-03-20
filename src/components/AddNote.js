// Import the useState hook
import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/noteContext";
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
const AddNote = () => {
  console.log(process.env.REACT_APP_BASE_URL);
  const context = useContext(noteContext);
  const { addNote } = context;
  const navigate = useNavigate();

// Initialize state for note, including description
  const [note, setNote] = useState({ title: "", tag: "" });

  const[desciptContet, setdesciptContet] = useState("");
  const handleEditorChange = (content, editor) => {
    setdesciptContet(content);
   
   }

  //  to remove html tag without effect
  
  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(note.title +  " -> " + desciptContet + " -> "  + note.tag);
   
    addNote(note.title, desciptContet , note.tag);
    
  };

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/login");
    } 
  }, [navigate])

  return (
    <>
    <div style={{background: "linear-gradient(to bottom right,   rgb(195, 195, 252), rgb(220 209 220), rgb(187 187 225))"}}>
      <div className="container py-5">
        <h2>Add your note</h2>
        <form className="py-4">
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              onChange={onChange}
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              placeholder="Enter title"
              required
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="desc">Description</label>
            
              <Editor
              apiKey='7h8nwbh43jf8l3bu92hxc8wwn3udo3emgicx67deep8un4wt'
              init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                  { value: 'First.Name', title: 'First Name' },
                  { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              }}
              initialValue="" // Set initial value from note.description
              onEditorChange={handleEditorChange} // Handle editor content changes
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              onChange={onChange}
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              placeholder="Tag"
              required
            />
          </div>
          <button
            disabled={note.title.length < 2 || desciptContet.length < 5}
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
      </div>
    </>
  );
};
export default AddNote;
