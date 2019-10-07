import React, { Component } from 'react';
import Header from '../../components/header';
import './style.scss';
import {get_info_admin, tiempox} from './service';

export default class AdminPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            history : [],
            users : [],
            tiempox : 0
        }
    }

    componentDidMount() {
        
        get_info_admin().then(res => {
            return res.json();
        }).then(res => {

            if(!res.error){

                console.log(res.message);                

                this.setState({
                    history : res.message.history,
                    users : res.message.users,
                    tiempox : res.message.tiempox.tiempox
                })

            }

        }).catch(err => {

            console.error(err);            

        })

    }

    printHistory(){

        return this.state.history.reverse().map((i,k) => {

            return (

                <div key={k}>
                    <div className="history">
                        <b>Fecha</b> : {i.timestamp}<br />
                        <b>Usuario</b>: {i.user.name} {i.user.lastName}<br />
                        <b>Solicitó</b>: <br />
                        <ul>
                            <li><b>Country</b>: {i.country}</li>
                            <li><b>Point</b>: {i.point}</li>
                        </ul>
                    </div>
                </div>

            )

        })

    }

    printUsers(){

        return this.state.users.reverse().map((i,k) => {

            return (

                <div key={k}>
                    <div className="history">
                        <b>Fecha</b> : {i.timestamp}<br />
                        <b>Usuario</b>: {i.name}<br />
                    </div>
                </div>

            )

        })

    }

    changeInput(value){

        console.log(value);
        
        this.setState({
            tiempox : value
        })

    }

    saveNewTiempoX(){

        tiempox(this.state.tiempox).then(res => {
            return res.json();            
        }).then(res => {
            
            if(!res.error){

                alert(res.message);

            }

        }).catch(err => {
            console.error(err);            
        })

    }
    
    render() {
        return (
            <div>
                <Header></Header>
                <div id="AdminPage">
                    <div className="container-fluid">
                        <div className="input">
                            <table>
                                <tr>
                                    <td>Modificar el Tiempo X (en minutos): </td>
                                    <td><input value={this.state.tiempox} onChange={(e) => this.changeInput(e.target.value)} type="number" name="tiempox" placeholder="Escriba el tiempo en minutos" /></td>
                                    <td><button onClick={() => this.saveNewTiempoX()}>Guardar</button></td>
                                </tr>
                            </table>
                        </div>
                        <div className="description">
                            En esta sección podrá ver el historial de búsquedas realizadas como también un log de usuarios logueados.
                        </div>

                        <div className="left">
                            <h3>Historial de búsquedas:</h3>
                            <div className="scroll">
                                {this.printHistory()}
                            </div>
                        </div>

                        <div className="right">
                            <h3>Log de usuarios:</h3>
                            <div className="scroll">
                                {this.printUsers()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
