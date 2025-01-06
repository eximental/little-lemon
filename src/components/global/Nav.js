import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Routes from '../../Routes';

function Nav() {
    return(
            <nav className="navigation">
                <ul>
                    <li><NavLink to="/"  className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                    <li><NavLink to="/booking" className={({ isActive }) => isActive ? "active" : ""}>Booking</NavLink></li>
                </ul>
            </nav>
    );
}

export default Nav;