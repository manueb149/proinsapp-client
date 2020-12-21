import React, { useReducer } from 'react';
import AlertReducer from './alertReducer';
import AlertContext from './alertContext';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertState = (props) => {

    const initialState = {
        alert: null
    };

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const showAlert = (text, severity) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                text,
                severity
            }
        })
        // Después de 3 segundos limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;