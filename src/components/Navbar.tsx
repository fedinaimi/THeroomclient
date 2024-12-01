import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Initialize state

    // Function to toggle menu open/close
    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle state
    };

    // Function to close menu
    const closeMenu = () => {
        setIsOpen(false); // Close the menu on link click
    };

    return (
        <div className={`navbar-container ${isOpen ? 'menu-open' : ''}`}>
            {/* Hamburger Menu */}
            <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Navbar */}
            <nav className={`navbar ${isOpen ? 'navbarResponsiveOpened' : 'navbarResponsiveClosed'}`}>
                <div className="navbar-brand">
                    <img src="src/assets/logoEscapeF.png" alt="Logo 1" className="logoEscape_navbar" />
                </div>
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
                    <li><Link to="/Scenario" onClick={closeMenu}>Scenarios</Link></li>
                    <li><Link to="/About" onClick={closeMenu}>A propos</Link></li>
                    <li><Link to="/Contact" onClick={closeMenu}>Contact</Link></li>
                    <li><Link to="/Teambuilding" onClick={closeMenu}>Teambuilding</Link></li>
                    <li><Link to="/reservation" onClick={closeMenu}>Reservation</Link></li>
                </ul>
                <div className="nav-buttons">
                    <Link to="/reservation">Reserver Maintenant</Link>
                    <Link to="/signin">Sign-in</Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;