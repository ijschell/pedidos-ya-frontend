import { APP_AUTHORIZATION } from '../../config';

export const check_app = () => {

    return fetch(APP_AUTHORIZATION);

}