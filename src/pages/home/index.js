import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header';
import HomePageLeftPanel from './left-panel';
import HomePageRightPanel from './right-panel';
import './style.scss';

export class HomePage extends Component {

    constructor(){
        super();
    }

    componentDidMount() {
        
        // oculto loader
        this.props.hideLoader();

    }
    

    render() {

        return (
            <div id="homePage">
                <Header></Header>
                <div className="panelLeft">
                    <HomePageLeftPanel></HomePageLeftPanel>
                </div>
                <div className="panelRight">
                    <HomePageRightPanel></HomePageRightPanel>
                </div>                
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => (
    {
        showLoader : (message) => dispatch(
            {
                component : 'loader',
                type : 'show',
                message
            }
        ),
        hideLoader : () => dispatch(
            {
                component : 'loader',
                type : 'hide'
            }
        )
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
