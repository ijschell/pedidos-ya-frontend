import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

import './style.scss';

export default class Header extends Component {
    render() {
        return (
            <header>
                <Link to="/">Home</Link>
                <Link to="/admin">Admin</Link>
            </header>
        )
    }
}
