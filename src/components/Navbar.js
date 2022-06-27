import React, { Component } from "react";
import logo from '../assets/img/atlantia_logo.png';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar">
                <a href="#" className="navbar-brand">
                    <img src={logo} />
                </a>
            </nav>
        );
    }
}

export default Navbar;
