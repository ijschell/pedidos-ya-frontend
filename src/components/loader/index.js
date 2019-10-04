import React, { Component } from 'react';
import './style.scss';
import logo from '../../assets/images/pedidos-ya-animation.gif';

export default class Loader extends Component {
    render() {
        return (
            <div id="Loader">
                <div className="logo">
                    <img src={logo} />
                    <p>Message</p>
                </div>
            </div>
        )
    }
}
