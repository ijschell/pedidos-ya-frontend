import React, { Component } from 'react';
import Header from '../../components/header';
import './style.scss';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                Home
            </div>
        )
    }
}
