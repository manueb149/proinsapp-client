import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// Conectext for DropDown menu
import { navbarContext } from '../../contexts/NavbarContext';
// Import DropdownSub from sub-menus of dropdown
import DropdownSub from "./DropdownSub";
// Import DropdownItem for sub-items of dropdown
import DropdownItem from "./DropdownItem";

const Dropdown = () => {

    const NavbarContext = useContext(navbarContext);
    const { menuHeight,dropdownRef } = NavbarContext;

    return (
        <div
            className="dropdown"
            style={{ height: menuHeight }}
            ref={dropdownRef}
        >
            <DropdownSub menu={'main'} type={'primary'} >

                <DropdownItem
                    leftIcon={"fas fa-tachometer-alt"}>
                    Inicio
                </DropdownItem>

                <DropdownItem leftIcon={'fas fa-truck-pickup'} goToMenu="service">
                    Solicitud
                </DropdownItem>

                <DropdownItem leftIcon={"fa fa-book"} goToMenu="report">
                    Registros
                </DropdownItem>

                <DropdownItem leftIcon={"fa fa-cogs"} goToMenu="config">
                    Cargar Datos
                </DropdownItem>

                <DropdownItem leftIcon={"fas fa-toggle-off"} goToMenu="main">
                <Link to='/'>Cerrar Sesión</Link>
                </DropdownItem>
            </DropdownSub>

            <DropdownSub menu={'service'} type={'secondary'} >
                <DropdownItem goToMenu="main" leftIcon={"fas fa-arrow-left"}>
                    Regresar
                </DropdownItem>
                <DropdownItem subMenu={'create'} leftIcon={'fas fa-plus'}>Crear Solicitud</DropdownItem>
                <DropdownItem subMenu={'print'} leftIcon={'fas fa-print'}>Imprimir Solicitud</DropdownItem>
            </DropdownSub>

            <DropdownSub menu={'report'} type={'secondary'} >
                <DropdownItem goToMenu="main" leftIcon={"fas fa-arrow-left"}>
                    Regresar
                </DropdownItem>
                <DropdownItem subMenu={'view'} leftIcon={"fas fa-book-open"}>Ver Registros</DropdownItem>
                <DropdownItem subMenu={'print'} leftIcon={"fas fa-print"}>Imprimir Registros</DropdownItem>
            </DropdownSub>

            <DropdownSub menu={'config'} type={'secondary'} >
                <DropdownItem goToMenu="main" leftIcon={"fas fa-arrow-left"}>
                    Regresar
                </DropdownItem>
                <DropdownItem subMenu={'upload'} leftIcon={"fas fa-table"}>Aseguradora</DropdownItem>
                <DropdownItem subMenu={'trucks'} leftIcon={"fas fa-truck-pickup"}>Grueros</DropdownItem>
            </DropdownSub>
        
        </div>
    );
}

export default Dropdown;