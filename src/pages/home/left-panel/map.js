import React, { Component } from 'react';
import {connect} from 'react-redux';
import styleMap from './style-map';
import { searchRestaurantsByCoords } from './service';

const BASE_LOGO = 'https://d1v73nxuzaqxgd.cloudfront.net/restaurants/';

var myMarker;

export class MapContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            map : null,
            myCoords : null,
            markers : [],
            markersMap : [],
            ready : false
        }

    }

    showInfo(info){

        console.log(info);        

    }

    saveResults(coords){

        searchRestaurantsByCoords(coords.lat, coords.lng).then(res => {
            return res.json();
        }).then(res => {

            console.log(res);            
            
            if(!res.error){

                // guardo los restaurantes en store
                this.props.saveRestaurants(res.restaurants);

                this.getRestaurantsAndPrintMarkers(res.restaurants);

            }

        })

    }

    resetMarkers(){

        this.state.markersMap.map(i => {

            i.setMap(null);

        })

    }

    printMarkers(){

        this.resetMarkers();

        // recorro todos los markers para imprimirlos en el mapa        
        var markersMap = this.state.markers.map((i, k) => {

            var icon = {
                url : BASE_LOGO + i.logo,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(0, 50),
                scaledSize: new window.google.maps.Size(50, 50)
            }

            var marker = new window.google.maps.Marker({
                position: {
                    lat: i.lat,
                    lng: i.lng
                }, 
                map: this.state.map,
                title : i.title,
                icon : icon
            });

            return marker;

        })

        this.setState({
            markersMap
        })

    }

    eventsMap(){

        this.state.map.addListener('click', (e) => {

            var newPosition = new window.google.maps.LatLng(e.latLng.lat(), e.latLng.lng());

            myMarker.setPosition(newPosition);

            var objPosition = {
                lat : e.latLng.lat(),
                lng : e.latLng.lng()
            }
            this.saveResults(objPosition);

          });

    }

    initMap(cords){

        // inicio mapa            
        var map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            styles : styleMap,
            center: {
                lat: cords.lat,
                lng: cords.lng
            }
        });

        this.setState({
            map
        })

        var icon = {
            url : 'https://cdn.mapmarker.io/api/v1/font-awesome/v4/pin?icon=fa-star&size=50&hoffset=0&voffset=-1&background=333',
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 50),
            scaledSize: new window.google.maps.Size(50, 50)
        }

        myMarker = new window.google.maps.Marker({
            position: {
                lat: cords.lat,
                lng: cords.lng
            }, 
            map: map,
            title : cords.title,
            icon : icon,
            draggable:true
        });

        this.eventsMap();

    }

    getGeolocation(){

        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    
                    // Si el usuario acepta dar su localización, las tomo y las envío como respuesta del Promise.
                    this.setState({
                        myCoords : {
                            lat : position.coords.latitude,
                            lng : position.coords.longitude,    
                        }
                    })

                    resolve({
                        lat : position.coords.latitude,
                        lng : position.coords.longitude,
                    });            

                }, (error) => {
                    
                    // de lo contrario, capto el error de gelocation y lo devuelvo
                    reject(error)

                });
            }
        })

    }

    componentDidMount() {

        this.setState({
            ready: true
        });

        this.getGeolocation().then(res => {

            const myCoords = {
                title : 'Aquí estás tu!',
                lat : res.lat,
                lng : res.lng
            }

            this.setState({
                myCoords,
                ready: true,
            })

            this.initMap(myCoords);

            this.saveResults(myCoords);

        }).catch(err => {

            alert(err.message);

            // default coords
            const myCoords = {
                title : 'Aquí estás tu!',
                lat : -34.9185678,
                lng : -56.1674899
            }

            this.initMap(myCoords);

            this.saveResults(myCoords);

        })

    }

    getRestaurantsAndPrintMarkers(restaurants){

        // creo variable para markers con los datos necesario para que imprima en map
        const markers = restaurants.map((i, k) => {

            const coords = i.coordinates.split(',');

            // Si necesito guardar más datos los debo agrgaragregar aquí
            return {
                lat : parseFloat(coords[0]),
                lng : parseFloat(coords[1]),
                title : i.name,
                logo : i.logo
            }
        });

        this.setState({
            markers
        });

        this.printMarkers();

    }

    render() {

        if(this.state.ready){
            return (
                <div>
                    <div id="map"></div>
                </div>
            )
        }else{
            return 'Cargando mapa...';
        }

    }
}

const mapStateToProps = (state) => ({
    restaurants : state.restaurants
})

const mapDispatchToProps = dispatch => ({
    saveRestaurants : (restaurants) => dispatch({
        component : 'restaurants',
        type : 'saveData',
        restaurants
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)

