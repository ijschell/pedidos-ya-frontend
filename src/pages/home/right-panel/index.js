import React, { Component } from 'react';
import { connect } from 'react-redux';
import { URL_BASE_LOGO, PROFILE_PEDIDOS } from '../../../common-services';
import starts from '../../../assets/images/stars.png';

import './style.scss';

export class HomePageRightPanel extends Component {

    constructor(props){
        super(props);
    }

    convertRatingToPercent(rating){

        const ratingParse = parseFloat(rating);
        const percent = (ratingParse * 100) / 5;

        return {
            width : percent + '%'
        }

    }

    openInfo(id){

        // cierro todos los items
        var elements = document.getElementsByClassName('info');

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.className = 'info';
        }

        // abro info de elemento seleccionado
        var element = document.getElementById(id);

        element.className = 'info active';

    }

    printUrl(link){

        return PROFILE_PEDIDOS(link);

    }

    isClose(element){

        // agrego clase "close" si el restaurante está cerrado
        if(element.opened !== 1){
            return 'close'
        }
        return '';

    }

    printRestaurants(){
        
        return this.props.restaurants.map((i, k) => {

            return (
                <div key={k} className={'item ' + this.isClose(i)} onClick={() => this.openInfo('info' + k)}>
                    <div className="name">
                        <span>
                            <img src={URL_BASE_LOGO + i.logo} />
                        </span>
                        <span>
                            <i className="cerrado">Cerrado - </i>
                            {i.name}
                        </span>
                        <span className="ratingNumber">{i.ratingScore}</span>
                        <span className="rating" title={i.ratingScore}>                            
                            <i className="background" style={this.convertRatingToPercent(i.ratingScore)}></i>
                            <img src={starts} />
                        </span>
                    </div>
                    <div className="info" id={'info' + k}>
                        <ul>
                            <li>
                                <span>Categorías principales: </span>
                                <span>{i.topCategories}</span>
                            </li>
                            <li>
                                <span>Tiempo estimado máximo de llegada: </span>
                                <span>{i.deliveryTimeMaxMinutes} minutos</span>
                            </li>
                            <li>
                                <span>Conoce más sobre este restaurante: </span>
                                <span>
                                    <a href={this.printUrl(i.link)} target="_blank">Conocé más</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            )

        })

    }

    render() {
        return (
            <div id="homePageRightPanel">
                <h2>Restaurantes cercanos</h2>
                <hr />
                <div className="contentItems">
                    {this.printRestaurants()}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    restaurants : state.restaurants
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageRightPanel)
