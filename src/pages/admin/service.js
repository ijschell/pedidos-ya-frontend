import { GET_INFO_ADMIN, TIEMPOX } from '../../config';

export const get_info_admin = () => {

    return fetch(GET_INFO_ADMIN);

}

export const tiempox = (tiempox) => {

    const data = {
        tiempox
    }

    return fetch(TIEMPOX, {
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    });

}