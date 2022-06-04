import React from 'react'

function Alert(props) {
    // function to capitalize the first letter of the word here.


    //had to commment it it was showing can't destructuring props.alerto as it was null initially problem for future solving
    // const { msg, type } = props.alerto;

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        props.alerto && <div>
            <div class={`alert alert-${props.alerto.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alerto.type)}</strong> : {props.alerto.msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>

        // start from 12:00 ****
    )
}

export default Alert;