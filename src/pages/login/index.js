import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import Logo from '../../assets/images/pedidos-ya-logo.png';
import { loginUser } from './service';
import { check_user } from '../../common-services';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

export class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password: '',
            tryLogin : false,
            redirect : false,
            redirectTo : ''
        }
    }

    changeInputs(name, e){

        const text = e.target.value;

        this.setState({
            [name] : text
        });

    }

    getUserInfo(){

        // checkeo si el usuario tiene token y si el mismo es válido
        const token = cookie.load('token');

        if(token){
            check_user(token).then(res => {
                return res.json();
            }).then(res => {

                if(!res.error){

                    // guardo datos del usuario en el store
                    this.props.saveUserData(res);

                    this.setState({
                        redirect : true,
                        redirectTo : '/'
                    })

                }

            })
        }

    }

    componentDidMount() {
        
        this.getUserInfo();

    }
    

    login(){

        this.props.login('Accediendo...');

        const token = cookie.load('token');

        loginUser(
            this.state.userName,
            this.state.password,
            token
        ).then(res => {

            if(!res.ok){
                this.props.login('Usuario o contraseña incorrectos');
            }

            return res.json();
            
        }).then(res => {

            if(!res.error){

                this.props.setIsLoader(true);

                this.props.login('Bienvenido!');

                // guardo nuevo token
                cookie.save('token', res.access_token);

                this.getUserInfo();

                // redirect to home
                this.setState({
                    redirect : true,
                    redirectTo : '/'
                })

                setTimeout(() => {
                    this.props.alertHide();
                }, 3000);

            }

        }).catch(err => {
            console.error(err);            
        })


    }

    render() {

        if(this.state.redirect){
            return (
                <div>
                    <Redirect to={this.state.redirectTo} />
                </div>
            )
        }else{
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
                                            <button className="btn btnSuccess" onClick={() => this.login()}>Acceder</button>
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
}


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => (
    {
        login : (text) => dispatch({
            component : 'loader',
            type : 'show',
            message : text
        }),
        alertHide : () => dispatch({
            component : 'loader',
            type : 'hide'
        }),
        saveUserData : (data) => dispatch({
            component : 'user',
            type : 'saveData',
            data
        }),
        setIsLoader : (set) => dispatch({
            component : 'isLoader',
            type : 'now_loaded',
            set
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
