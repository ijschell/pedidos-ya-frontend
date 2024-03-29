import cookie from 'react-cookies';
import { SEARCH_RESTAURANTS } from '../../../config';

export const searchRestaurantsByCoords = (lat, lng, userInfo) => {

    const token = cookie.load('token');
    const country = 1;
    const max = 20;
    const point = lat +','+ lng;

    return fetch(SEARCH_RESTAURANTS + 
        '?country='+country+
        '&point='+point+
        '&max='+max+
        '&user='+JSON.stringify(userInfo)+
        '&fields=name,topCategories,rating,opened,rating,ratingScore,deliveryTimeMaxMinutes,logo,link,coordinates',
        {
            headers : {
                'Authorization' : 'Bearer ' + token
            }
        }
    );

}