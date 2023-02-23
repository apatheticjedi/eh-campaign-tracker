import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

function Header() {

    return (
        <>
            <div className="background-image">
                <h1>Eldritch Campaign Tracker</h1>
            </div>
            <nav className='nav'>
                {Auth.loggedIn() ? (
                <ul>
                    <li>Start New Campaign</li>
                    <li>Logout</li>
                </ul>

                ) : (
                    <>
                    <Link to='/login'>Login</Link>
                    </>
                )}
            </nav>
        </>
    )
};

export default Header;