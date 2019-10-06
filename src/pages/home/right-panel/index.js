import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

export class HomePageRightPanel extends Component {

    render() {
        return (
            <div id="homePageRightPanel">
                <h2>Restaurantes cercanos</h2>
                <hr />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    restaurantes : state.restaurantes
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageRightPanel)
