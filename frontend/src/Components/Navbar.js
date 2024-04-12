import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand hindi" to="/">रवि ट्रेडर्स</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                </div>
                {
                    !localStorage.getItem('token') ? 
                    <div className='d-flex'>
                        <Link className='btn btn-primary mx-2' role='button' to="/login">Login</Link>
                        <Link className='btn btn-primary mx-2' role='button' to="/signup">Sign Up</Link>
                    </div>
                    :
                    <div className='d-flex'>
                        <button className='btn btn-danger mx-2' onClick={ handleLogout }>Logout</button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar
