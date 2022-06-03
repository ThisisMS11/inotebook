import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';


const Notes = () => {
    // Getting all the states and other functions  from our context api
    const context = useContext(noteContext);
    const { notes, getNotes } = context;




    // This is to fetch all the users note whenever Notes is called
    useEffect(() => {
        getNotes()
    }, [])




    // ! stuff regarding updating the noteitem

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })


    const updatenote = (currentNote) => {
        ref.current.click();
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(note)
    }

    const onChange = (e) => {
        // we want to name of the element to become equal to the value inside of the element here
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    //useref helps us in giving reference to any element in JSX for more knowledge visit original docs
    const ref = useRef(null)

    return (
        <>
            {/* Addnote :-> Contains the code for creating new note using form filling with addnote and clear btns*/}
            <Addnote />


            {/* Modal starting */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label" >Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label" >Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label" >tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            {/* whenever this update will be hit we will change our note and also make the api call there */}

                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>w
                </div>
            </div>
            {/* Modal ending */}



            {/* Serving the notes via iterating via json data */}
            <div className="container my-3">
                <h2 className="my-3">Your notes</h2>
                <div className=" row ">
                    {notes.map(
                        (note) => {
                            return <Noteitem key={note._id} note={note} updatenote={updatenote} />;
                        }
                    )}
                </div>

            </div>
        </>
    )
}

export default Notes