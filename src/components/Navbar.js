import React, { useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    let location = useLocation();
    // useEffect(() => {
    //     console.log(location);
    // }, [location])

    const context = useContext(noteContext);
    const navigate = useNavigate();


    const handlelogout = () => {
        localStorage.removeItem('token');
        navigate('/login')

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item ">

                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>


                    {/* null=false --> user is not logged in ---> login signup to show --> !false=true */}

                    {!localStorage.getItem('token') ? <div className="d-flex">
                        <Link className="btn btn-primary mx-2" to='/login'>Login</Link>
                        <Link className="btn btn-primary mx-2" to='/signup'>Sign up</Link>
                    </div> : <button className="btn btn-primary mx-2" onClick={handlelogout}>LogOut</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
