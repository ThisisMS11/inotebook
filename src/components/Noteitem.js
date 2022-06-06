import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const Noteitem = (props) => {
    const { note, updatenote } = props;

    const context = useContext(noteContext);
    const { deletenote } = context;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const image = require('../')
    return (
        <>
            <div className="col-sm-3">
                <div className="card my-3 " >
                    <div className="card-body ">

                        <h5 className="card-title">{capitalizeFirstLetter(note.title)}</h5>


                        <p className="card-text">{note.description}
                        </p>

                        <div className="d-flex justify-content-between">
                            <span className="badge text-bg-primary">{note.tag}</span>

                            <div>
                                <i className="fa-solid fa-pen-to-square mx-3" onClick={() => { updatenote(note) }}></i>

                                <i class="fa-solid fa-trash mx-3" onClick={() => { deletenote(note._id, props.showalert) }}></i>

                            </div>



                            {/* my way of showing delete alert*/}
                            {/* <i onClick={() => { deletenote(note._id, props.showalert) }}>delete</i> */}

                            {/*harry bhai way of showing delete message #71 9:00 */}
                            {/* <i onClick={() => { deletenote(note._id); props.showalert(`${note.title} successfully deleted`,'success'); }}>delete</i> */}

                            {/* <i onClick={() => { updatenote(note) }}>update</i> */}



                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem