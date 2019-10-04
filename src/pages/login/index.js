import React, { Component } from 'react';
import './style.scss';
import Logo from '../../assets/images/pedidos-ya-logo.png';

export default class LoginPage extends Component {

    constructor(){
        super();
        this.state = {
            userName: 'asd',
            password: ''
        }
    }

    changeInputs(name, e){

        const text = e.target.value;

        this.setState({
            [name] : text
        })

    }

    tryLogin(){

        const userName = this.state.userName;
        const password = this.state.password;

        console.log(userName, password);
        
    }

    render() {
        return (
            <div id="LoginPage">
                <div className="container">
                    <div className="overlay">
                        <div className="contentLogin">
                            <div className="header">
                                <img className="logo" src={Logo} />
                                <hr/>
                            </div>
                            <div className="form">
                                <div className="formGroup">
                                    <label>
                                        <span>
                                            <i className="material-icons">face</i>
                                        </span>
                                        <span>
                                            Usuario
                                        </span>
                                    </label>
                                    <input type="text" name="userName" onKeyUp={e => this.changeInputs('userName', e)} />
                                </div>
                                <div className="formGroup">
                                    <label>
                                        <span>
                                            <i className="material-icons">vpn_key</i>
                                        </span>
                                        <span>
                                            Contraseña
                                        </span>
                                    </label>
                                    <input type="password" name="password" onKeyUp={e => this.changeInputs('password', e)}/>
                                </div>
                                <div className="formGroup">
                                    <div className="pushRight">
                                        <button className="btn btnSuccess" onClick={() => this.tryLogin()}>Acceder</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}