import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
    let [clicked, setClicked] = useState('home')
    return (
        <div className='navbar'>
            <div className='navbar__link '>
                <Link to='/'>
                    <p onClick={() => setClicked('home')} className={clicked == 'home' ? 'clicked' : 'not-clicked'}>Home</p>
                </Link>
                <Link to='/locations'>
                    <p onClick={() => setClicked('location')} className={clicked == 'location' ? 'clicked' : 'not-clicked'}>Locations</p>
                </Link>

                <Link to='/episodes'>
                    <p onClick={() => setClicked('episode')} className={clicked == 'episode' ? 'clicked' : 'not-clicked'}>Episodes</p>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
