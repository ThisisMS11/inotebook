import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const Addnote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    //if we do not place tag:"default" and leave tag blank that tag will not be taken at all.
    const [note, setNote] = useState({ title: "", description: "", tag: "general" })


    const handleClick = (e) => {
        e.preventDefault();

        // add note is our api call for adding notes in notstate
        addNote(note.title, note.description, note.tag);


        // this is to avoid the retreival of same values of the previous note after it's creation

        Clear();

        props.showalert("note added",'success')
    }

    const Clear = () => {
        const title = document.getElementById('title');
        const description = document.getElementById('description')
        const tag = document.getElementById('tag')
        title.value = "";
        description.value = ""
        tag.value = "";

        //resetting the note
        setNote({ title: "", description: "", tag: "general" })

    }

    const onChange = (e) => {
        // we want to name of the element to become equal to the value inside of the element here
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label" >Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>

                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                    <div className="btn btn-primary mx-4" onClick={Clear}>Clear</div>
                </form>
            </div>
        </>
    )
}

export default Addnote


