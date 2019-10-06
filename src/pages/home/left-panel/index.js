import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import MapContainer from './map';

export class HomePageLeftPanel extends Component {    

    render() {
        return (
            <div id="homePageLeftPanel">
                <MapContainer></MapContainer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => ({
    showAlert : (text) => dispatch({
        component : 'loader',
        type : 'show',
        message : text
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageLeftPanel)
