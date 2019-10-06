export const reducers = (state, action) => {

    if(action.component === 'loader'){

        state = handleLoader(state, action);

    }

    if(action.component === 'app_authorization'){

        state = handleAppAuth(state, action);

    }

    if(action.component === 'user'){

        state = handleUser(state, action);

    }

    if(action.component === 'restaurants'){

        state = handleRestaurants(state, action);

    }

    return state;

}

const handleLoader = (state, action) => {

    switch (action.type) {
        case 'show':
            
            return {
                ...state,
                loader : {
                    show : true,
                    message : action.message
                }
            }

        break;
        case 'hide':
            
            return {
                ...state,
                loader : {
                    show : false,
                    message : ''
                }
            }

        break;
    }

}

const handleAppAuth = (state, action) => {

    switch (action.type) {
        case 'set_authorization':
            
            return {
                ...state,
                app_authorization : {
                    authorized : action.authorized,
                    access_token : action.access_token
                }
            }

        break;
    }

}

const handleUser = (state, action) => {

    switch (action.type) {
        case 'saveData':
            
            return {
                ...state,
                user : action.data
            }

        break;
    }

}

const handleRestaurants = (state, action) => {

    switch (action.type) {
        case 'saveData':
            return {
                ...state,
                restaurants : action.restaurants
            }
        break;
    }

}