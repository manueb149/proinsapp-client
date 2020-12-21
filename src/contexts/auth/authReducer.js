import {
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../../types';

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                msg: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }
        case LOGOUT:
        case LOGIN_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                msg: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default authReducer;