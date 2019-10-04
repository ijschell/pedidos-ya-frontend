import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import logo from '../../assets/images/pedidos-ya-animation.gif';

export class Loader extends Component {

    constructor(props){
        super(props);
    }

    showLoader(){

        if(this.props.loader.show){
            return 'active';
        }

        return '';

    }

    render() {

        return (
            <div id="Loader" className={this.showLoader()}>
                <div className="logo">
                    <img src={logo} />
                    <p>{this.props.loader.message}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loader : state.loader
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Loader)
