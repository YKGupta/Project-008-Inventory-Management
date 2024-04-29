import React, { useContext } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CartContext from '../Context/CartContext';

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useContext(CartContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        setCartItems([]);
        navigate('/login');
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container-fluid">
                <Link className="hindi link" to="/">रवि ट्रेडर्स</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`link ${location.pathname === '/' ? 'highlight' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className={`link ${location.pathname === '/x' ? 'highlight' : ''}`} aria-current="page" to="/">Coming Soon</Link>
                        </li> */}
                    </ul>
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    {
                        !localStorage.getItem('token') ?
                            <>
                                <Link className="button mx-2" to="/login">Login</Link>
                                <Link className="button mx-2" to="/signup">Sign Up</Link>
                            </>
                            :
                            <>
                                {
                                    cartItems.length > 0 && 
                                    <div className='mx-4 position-relative' onClick={handleCartClick}>
                                        <i className="fa-solid fa-cart-shopping fa-xl"></i>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill border border-dark" style={{ fontSize: '8.5px',backgroundColor: '#FFF9F4', color: '#2D3436'}}>
                                            { cartItems.length }
                                            <span className="visually-hidden">cart items</span>
                                        </span>
                                    </div>
                                }
                                <button className="button mx-2" onClick={handleLogout}>Logout</button>
                            </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
