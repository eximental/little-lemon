import React from 'react';
import Nav from './Nav';
import Routes from '../../Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function Header() {
    return(
        <header>
            <h1>Little Lemon</h1>
            <Nav />
        </header>
    );
}

export default Header;