import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axios from '../../config/http-common';
import tokenAuth from '../../config/token';

import {
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../../types';

const AuthState = (props) => {

    const initialState = {
        token: window.localStorage.getItem('token'),
        authenticated: null,
        user: null, 
        msg: null, 
        loading: false
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Retorna el usuario autenticado
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);
        try {
            const result = await axios.get('/auth');
            // console.log(result.data.user.roles[0].find(value => value==='report'));
            dispatch({
                type: GET_USER,
                payload: result.data.user
            });

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión
    const login = async loginData => {
        const { email, password, setLoading } = loginData;
        try {
            const result = await axios.post('/auth', {email, password});
            dispatch({
                type: LOGIN_SUCCESS,
                payload: result.data
            });

            // Obtener el usuario
            userAuthenticated();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const alerta = {
                text: error?.response?.data?.text || 'Error',
                severity: 'error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierra la sesión del usuario
    const logout = () => {
        dispatch({
            type: LOGOUT
        });
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                msg: state.msg,
                loading: state.loading,
                userAuthenticated,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;