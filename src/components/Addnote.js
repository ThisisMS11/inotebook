import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
const Addnote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })


    const handleClick = (e) => {
        e.preventDefault();

        addNote(note.title,note.description,note.tag);

        // setting the default text = "" once handleclick is clicked
        Clear();
    }

    const Clear=()=>{
        const title=document.getElementById('title');
        const description=document.getElementById('description')
        const tag=document.getElementById('tag')
        title.value="";
        description.value=""
        tag.value=""
    }

    const onChange = (e) => {
        // we want to name of the element to become equal to the value inside of the element here
        setNote({...note, [e.target.name]: e.target.value })
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
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                    <div className="btn btn-primary mx-4" onClick={Clear}>Clear</div>
                </form>
            </div>
        </>
    )
}

export default Addnote


