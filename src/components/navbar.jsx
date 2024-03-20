import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { logout } from '../auth/auth'; // Import the logout function
import '../styles/navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation(); // Add this line

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!token); // Update the state based on the presence of a token
    }, [location]); // Add location as a dependency

    return (
        <nav className="navbar">
            <h3>
                {isLoggedIn ? (
                    <Link to="/userPage" className="navbar-brand">MyApp</Link>
                ) : (
                    <Link to="/" className="navbar-brand">MyApp</Link>
                )}
            </h3>
            <ul className="navbar-nav">
                {isLoggedIn ? (
                    <>
                        <li><Link to="/userPage">UserPage</Link></li>
                        <li><a href="#" onClick={logout}>Logout</a></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
