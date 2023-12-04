import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function NavbarSet({ children }) {

    const location = useLocation();
    const [showNavbar, setShowNavbar] =useState(false);

    useEffect(() => {
        if(location.pathname === '/login') {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
    },[location])

    return (
        <div>
            {showNavbar && children }
        </div>
    )
}
