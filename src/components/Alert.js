import React,{useState} from 'react'

const Alert = (props) => {
    let { message } = props;

    const [msg, setMsg] = useState(message) 

    /* this can change the message after 1 second
        setTimeout(() => {
        setMsg('hi god !')
        }, 2000);
    */

    return (
        <>
            <div className="alert alert-primary" role="alert">
                {msg}
            </div>
        </>
    )
}

export default Alert    