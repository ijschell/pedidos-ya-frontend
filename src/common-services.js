import { GET_USER_INFO } from './config';

export const check_user = (token) => {

    return fetch(GET_USER_INFO, {
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    });

}

export const URL_BASE_LOGO = 'https://d1v73nxuzaqxgd.cloudfront.net/restaurants/';

export const PROFILE_PEDIDOS = (link) => {
    return `http://www.pedidosya.com.uy/restaurantes/montevideo/${link}-menu`;
}