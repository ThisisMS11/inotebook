import NoteContext from "./noteContext";
import { useState } from "react";

// ! All the states created inside of Notestate will be accessible to all the child components in app.js given that all the components are binded inside of the <NoteState> </NoteState>

const NoteState = (props) => {

    const host = 'http://localhost:5000';
    const notesinitial = [];

    const [notes, setNotes] = useState(notesinitial)


    // fetching/getting notes from our database
    const getNotes = async () => {
        // making the api call to fetch notes from our database
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5MzljZjdhNmFkYjMxZjQwNGUyZjMwIn0sImlhdCI6MTY1Mzk3MjQ1NH0.g3WRzj_sTSyW9amARymGOqfDs2Dtzct-pqUt8MFxfzQ'
            },
        });
        const json = await response.json();
        setNotes(json)
    }

    // add note
    const addNote = async (title, description, tag) => {
        // making the api call to add note to our database
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5MzljZjdhNmFkYjMxZjQwNGUyZjMwIn0sImlhdCI6MTY1Mzk3MjQ1NH0.g3WRzj_sTSyW9amARymGOqfDs2Dtzct-pqUt8MFxfzQ'
            },
            body: JSON.stringify({ title, description, tag })
        });


        const json = await response.json();

        /*
            const note = {
            "_id": "73eb4f24576b66d7b30784",
            "user": "62939cf7a6adb31f404e2f30",
            "title": `${title}`,
            "description": `${description}`,
            "tag": "new note",
            "date": "2022-06-01T10:25:56.330Z",
            "__v": 0
        };
        notes were some hard coded notes in NoteState.js
        */

        setNotes(notes.concat(json))

    }

    // Delete note
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5MzljZjdhNmFkYjMxZjQwNGUyZjMwIn0sImlhdCI6MTY1Mzk3MjQ1NH0.g3WRzj_sTSyW9amARymGOqfDs2Dtzct-pqUt8MFxfzQ'
            }
        });

        const json = await response.json();

        console.log(json)

        // filtering out all the notes whose id do not match with the one aimed to delete
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // update note
    const editnote = async (id, title, description, tag) => {

        // API call for fetching data
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5MzljZjdhNmFkYjMxZjQwNGUyZjMwIn0sImlhdCI6MTY1Mzk3MjQ1NH0.g3WRzj_sTSyW9amARymGOqfDs2Dtzct-pqUt8MFxfzQ'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();

        // it will create a deep copy
        let newNote = JSON.parse(JSON.stringify(notes))


        //finding the note and updating it.
        for (let index = 0; index < newNote.length; index++) {
            let element = newNote[index];
            if (element._id == id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNote)

    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deletenote, editnote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;