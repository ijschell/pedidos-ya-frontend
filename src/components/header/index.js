import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { check_user } from '../../common-services';
import cookie from 'react-cookies';
import logo from '../../assets/images/pedidos-ya-logo.png';
import './style.scss';

export class Header extends Component {

    componentDidMount() {
        
        // checkeo si tengo datos del usuario guardados en el store
        // TRUE : no debo hacer nada
        // FALSE : los busco en el server y lo agrego al store
        if(this.props.userData.id === 0){

            const token = cookie.load('token');

            if(token){

                check_user(token).then(res => {
                    return res.json();
                }).then(res => {
                    
                    if(!res.error){

                        this.props.saveUserData(res);
                        
                    }else{

                        this.props.login(res.message)

                    }
                    
                })

            }

        }

    }

    closeSession(){

        cookie.remove('token');
        window.location.reload();
        return false;

    }    

    render() {
        return (
            <header>
                <div className="left">
                    <img src={logo} />
                </div>
                <div className="right">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/admin">Admin</Link></li>
                    </ul>
                    <div className="user">
                        <span>Bienvenido {this.props.userData.name} {this.props.userData.lastName}</span>
                        <span>
                            <i className="material-icons">tag_faces</i>
                        </span>
                        <span>
                            <a onClick={() => this.closeSession()} title="Salir" href="#"><i className="material-icons">exit_to_app</i></a>
                        </span>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    userData : state.user
})

const mapDispatchToProps = dispatch => (
    {
        login : (text) => dispatch({
            component : 'loader',
            type : 'show',
            message : text
        }),
        saveUserData : (data) => dispatch({
            component : 'user',
            type : 'saveData',
            data
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
