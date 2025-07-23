import React from 'react';
import { Link } from 'react-router-dom';

import logo from "../assets/github-mark-white.svg";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav>
            <Link to="/">
                <div>
                    <img src={logo} alt="Logo" />
                </div>
                <h3>Github</h3>
            </Link>
            <div>
                <Link to="/create">
                    <p>Create a Repository</p>
                </Link>
                <Link to="/profile">
                    <p>Profile</p>
                </Link>
            </div>

        </nav>
    )
};

export default Navbar;

