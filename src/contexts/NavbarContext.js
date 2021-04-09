import React, { useState, createContext, useRef, useContext, useEffect } from 'react';
import AuthContext from "../contexts/auth/authContext";
import getActiveMenu from "../components/utils/getActiveMenu";

export const navbarContext = createContext();

const NavbarContext = (props) => {

    // Extraer la información de autenticación
	const authContext = useContext(AuthContext);
	const { user } = authContext;

    const [activeMenu, setActiveMenu] = useState('main');
    const [activeSubMenu, setActiveSubMenu] = useState('');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    // Inicializar ventana de entrada principal
    useEffect(() => {
        const setMenu = () => {
            if(user){
                setActiveMenu(getActiveMenu(String(user.name).toUpperCase())[0])
                setActiveSubMenu(getActiveMenu(String(user.name).toUpperCase())[1])
            }
        }
        setMenu();
    }, [user])

    const calcHeight = e => {
        setMenuHeight(e.offsetHeight);
    }

    return (
        <navbarContext.Provider
            value={{
                activeMenu,
                activeSubMenu,
                menuHeight,
                dropdownRef,
                setActiveMenu,
                setActiveSubMenu,
                setMenuHeight,
                calcHeight
            }}
        >
            {props.children}
        </navbarContext.Provider>
    );
}

export default NavbarContext;