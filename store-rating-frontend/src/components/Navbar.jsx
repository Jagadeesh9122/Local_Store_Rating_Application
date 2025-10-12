import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='nav-bar'>
            <div className="name-tag-container">
                <div className="brand-group">
                    <span className='star'>★</span>
                    <Link to="/stores" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className='name'>R8MyStore</span>
                    </Link>
                </div>
                <span className='tagline'>Your Opinion. Every Store. One Platform.</span>
            </div>
        </nav>
    );
};

export default Navbar;