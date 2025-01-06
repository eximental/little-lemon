// src/components/global/Nav.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav aria-label="Main Navigation">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/booking" className={({ isActive }) => (isActive ? 'active' : '')}>
            Booking
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
