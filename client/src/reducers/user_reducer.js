import { 
        LOGIN_USER, REGISTER_USER, AUTH_USER, GET_CART_ITEMS_USER, LOGOUT_USER, ADD_TO_CART_USER
    } from './../actions/types';

    export default function(state={} , action) {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, success: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER: 
            return { ...state, userData: action.payload } 
        case LOGOUT_USER:
            return {...state }
        case ADD_TO_CART_USER:
            return {...state, userData: {
                ...state.userData,
                cart: action.payload
            } }
        case GET_CART_ITEMS_USER:
            return {...state, cartDetail: action.payload }
        default:
            return state;
    }
}