export const reducers = (state, action) => {

    console.log('------------------------------DEBUG------------------------------------')
    console.log(action)
    console.log('------------------------------DEBUG------------------------------------')

    if(action.component === 'loader'){

        state = handleLoader(state, action);

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