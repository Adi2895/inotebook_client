import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getallnotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getallnotes();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const[desciptContet, setdesciptContet] = useState();
  const handleEditorChange = (content, editor) => {
    //  console.log('Content was updated:', content);
     setdesciptContet(content);
   
   }

   

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription:"",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    // console.log(currentNote._id);
    console.log(currentNote)

    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    })
    
    setdesciptContet(note.edescription)
    console.log(note)
    console.log(desciptContet)
    props.showAlert("Notes updated successfully", "success");
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, desciptContet, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

   // Function to strip HTML tags
   const stripHtmlTags = (html) => {
    // console.log(html)
    // console.log("HTML content:", html);
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const textContent = doc.body.textContent || "";
    // console.log("Stripped content:", textContent);
    return textContent;
  };

  
  return (
    <>
    
      <AddNote />
      <div style={{background: "linear-gradient(to bottom, rgb(215 195 216), rgb(192 195 217), rgb(158 158 201))"}}>
      <div className="container">
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 style={{color:"black"}} className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div style={{color:"black"}} className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    placeholder="Enter title"
                    onChange={onChange}
                  />
                </div>
                <div style={{color:"black"}} className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
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
              initialValue={note.edescription} // Set initial value from note.description
              onEditorChange={handleEditorChange} // Handle editor content changes
            />
                </div>
                <div style={{color:"black"}} className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    placeholder="Tag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                onClick={handleClick}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 2
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <h3>Your Notes</h3>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={{ 
              ...note, 
              edescription: stripHtmlTags(note.description)  
            }}  />
          );
        })}
      </div>
      </div>
      </div>
    </>
  );
};
export default Notes;
