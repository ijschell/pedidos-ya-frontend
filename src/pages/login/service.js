import { AUTHENTICATION_USER, GET_USER_INFO } from '../../config';

export const loginUser = (userName, password, token) => {

    const data = {
        userName,
        password
    }

    return fetch(AUTHENTICATION_USER, {
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Authorization' : 'Bearer ' + token,
            'Content-Type' : 'application/json'
        }
    });

}