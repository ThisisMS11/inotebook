import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const { name, email, password ,cpassword} = credentials;

    const navigate = useNavigate();


    // for adding the new user data into our database.
    const handlesubmit = async (e) => {
        // without this the page would reload which we don't want obviously 
        e.preventDefault();

        console.log("our credentials are ",credentials)

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        // json contains success msg and auth-token
        const json = await response.json();

        // saving the authtoken
        if (json.success) {
            console.log("Signup successful");
            localStorage.setItem('token', json.authtoken);
            navigate('/')
        }
        else {
            alert("Invalid Credentials")
        }

    }

    const onChange = (e) => {
        // we want to name of the element to become equal to the value inside of the element here
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className='container my-5'>

            <form onSubmit={handlesubmit}>
                <h1 className='text-center'>
                    Sign Up
                </h1>

                <div className="mb-4">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter your Name" aria-describedby="NameHelp" onChange={onChange} value={name} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label"  >Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" onChange={onChange} value={email}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label"  >Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder='Enter password' onChange={onChange} value={password} minLength={5} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"  >Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder='Enter password' onChange={onChange} value={cpassword} minLength={5} required />
                </div>

                <div className="mb-3 text-center">

                    <button type="submit" className="btn btn-primary " >Join Now</button>
                </div>

            </form>
        </div>
    )
}

export default Signup