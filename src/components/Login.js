import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        // without this the page would reload which we don't want obviously 
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        // json contains success msg and auth token
        const json = await response.json();

        if (json.success) {
            //redirecting to the home page adding log out and removing login and sign up buttons
            // saving the authtoken
            console.log("Login successful");
            localStorage.setItem('token', json.authtoken);
            navigate('/')
            props.showalert("Login Successful you are logged in","success")
        }
        else{
            props.showalert("Login failed","danger")
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
                    LOGIN
                </h1>

                <div className="mb-4">
                    <label htmlFor="email" type="email" className="form-label" >Email</label>
                    <input type="email" placeholder="Enter your Email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" type="password" className="form-label" >Password</label>
                    <input type="password" placeholder="Enter your Password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>

                <div className="mb-3 text-center">

                    <button type="submit" className="btn btn-primary">Login</button>
                </div>

            </form>
        </div>
    )
}

export default Login