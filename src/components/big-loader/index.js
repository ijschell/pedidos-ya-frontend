import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import logo from '../../assets/images/pedidos-ya-animation.gif';
import {check_app } from './service';
import { check_user } from '../../common-services';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';

export class BigLoader extends Component {

    constructor(props){
        super(props);
        this.state = {
            message : '',
            redirect : false,
            redirectTo : '',
            ready : false
        }
    }

    saveTokenInBrowser(token){

        cookie.save('token', token, { path: '/' })

    }

    redirectTo(){

        if(this.state.redirect){
            return <Redirect to={this.state.redirectTo} />
        }

    }

    checkAppAndLogin(){

        // solicito token app authorization y lo envío a login        
        check_app().then(res => {
            return res.json();
        }).then(res => {
                                    
            if(!res.error){
                // this.props.set_app_authorization(true, res.access_token);
                // and save token in browser
                this.saveTokenInBrowser(res.access_token);
                // lo envío a login
                this.setState({
                    ready: true,
                    redirect : true,
                    redirectTo : '/login'
                })
            }else{
                this.setState({
                    message : res.message
                })
            }

        }).catch(err => {
            console.log(err);            
        })

    }

    componentDidMount() {

        // 1 checkeo - si ya tiene un token en el navegador, si lo tiene compruebo si es válido
        //     contra el endpoint /myAccount envíandole el token
        const token = cookie.load('token');

        if(token){

            check_user(token).then(res => {

                return res.json();

            }).then(res => {       

                if(!res.error){
                    // go to home, ya está logueado
                    this.setState({
                        ready: true,
                        redirect : true,
                        redirectTo : '/'
                    })
                }else{

                    this.checkAppAndLogin();

                }

            })

        }else{

            this.checkAppAndLogin();

        }
                        
    }
    
    render() {

        if(this.state.ready){
            return (
                <div>{this.redirectTo()}</div>
            )
        }else{
            return (
                <div id="bigLoader">
                    {this.redirectTo()}
                    <div>
                        <img src={logo} />
                        <p>Validando App...</p>
                    </div>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => ({
    app_authorization : state.app_authorization,
    authentication_user : state.authentication_user,
})

const mapDispatchToProps = dispatch => (
    {
        set_app_authorization : (authorized, access_token) => dispatch({
            component : 'app_authorization',
            type : 'set_authorization',
            authorized,
            access_token
        })
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(BigLoader)
