import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Booking from './pages/Booking.js';


function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="*" element={
                <><h2>404 - Not Found</h2><p>The page you are looking for does not exist.</p></>
            }/>

        </Routes>
    );
}
export default AppRoutes;