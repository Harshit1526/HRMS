import React from 'react';
import './Header.css';
import logo from "./Logo.jpeg"; 
const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="Company Logo" className="header-logo" />
        </header>
    );
};

export default Header;
