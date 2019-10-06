import { GET_USER_INFO } from './config';

export const check_user = (token) => {

    return fetch(GET_USER_INFO, {
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    });

}