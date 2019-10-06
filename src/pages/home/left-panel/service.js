import cookie from 'react-cookies';
import { SEARCH_RESTAURANTS } from '../../../config';

export const searchRestaurantsByCoords = (lat, lng) => {

    const token = cookie.load('token');
    const country = 1;
    const max = 20;
    const point = lat +','+ lng;

    return fetch(SEARCH_RESTAURANTS + 
        '?country='+country+
        '&point='+point+
        '&max='+max,
        {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }
    );

}