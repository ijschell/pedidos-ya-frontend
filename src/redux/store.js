import { createStore } from 'redux';
import { reducers } from './reducers';

const initialState = {
    isLoader : false,
    app_authorization : {
        authorized : false,
        access_token : ''
    },
    authentication_user : {
        authorized : false,
        access_token : ''
    },
    loader : {
        show : false,
        message : ''
    },
    user : {
        id: 0,
        lastName: '',
        name: '',
        country: {
            id : 0
        } 
    },
    restaurants : []
}

export const store = createStore(
    reducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store