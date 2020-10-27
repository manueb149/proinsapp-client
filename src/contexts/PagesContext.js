import React, { createContext, useState } from 'react';

export const mainContext = createContext();

const PagesContext = ({ children }) => {

    const [mainMenu, setMainMenu] = useState({
        inicio: true,
        solicitud: {
            crear: false,
            imprimir: false
        },
        registros: {
            ver: false,
            imprimir: false
        }
    });

    return (
        <mainContext.Provider
            value={{
                mainMenu: mainMenu,
                setMainMenu: setMainMenu
            }}
        >
            {children}
        </mainContext.Provider>
    )
}

export default PagesContext;
