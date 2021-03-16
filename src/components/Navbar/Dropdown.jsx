import React, { useContext } from "react";
// import { Link } from 'react-router-dom';
// Conectext for DropDown menu
import { navbarContext } from "../../contexts/NavbarContext";
// Import DropdownSub from sub-menus of dropdown
import DropdownSub from "./DropdownSub";
// Import DropdownItem for sub-items of dropdown
import DropdownItem from "./DropdownItem";
// Import AuthContext
import authContext from "../../contexts/auth/authContext";

const Dropdown = () => {
	const NavbarContext = useContext(navbarContext);
	const { menuHeight, dropdownRef } = NavbarContext;

	const AuthContext = useContext(authContext);
	const { logout, user } = AuthContext;

	return (
		<div
			className="dropdown"
			style={{ height: menuHeight }}
			ref={dropdownRef}
		>
			<DropdownSub menu={"main"} type={"primary"}>
				<DropdownItem leftIcon={"fas fa-tachometer-alt"}>
					Inicio
				</DropdownItem>
				{user.roles[0].find((value) => value === "service") ? (
					<DropdownItem leftIcon={"fas fa-truck-pickup"} goToMenu="service">
						Solicitud
					</DropdownItem>
				) : null}
				{user.roles[0].find((value) => value === "report") ? (
					<DropdownItem leftIcon={"fa fa-book"} goToMenu="report">
						Registros
					</DropdownItem>
				) : null}
				{user.roles[0].find((value) => value === "config") ? (
					<DropdownItem leftIcon={"fa fa-cogs"} goToMenu="config">
						Configuración
					</DropdownItem>
				) : null}
				<DropdownItem leftIcon={"fas fa-toggle-off"} goToMenu="main">
					<a href="!#" onClick={() => logout()}>
						Cerrar Sesión
					</a>
				</DropdownItem>
			</DropdownSub>

			<DropdownSub menu={"service"} type={"secondary"}>
				<DropdownItem goToMenu="main" leftIcon={"fas fa-arrow-left"}>
					Regresar
				</DropdownItem>
				{user.roles[1].find((value) => value === "create") ? (
					<DropdownItem subMenu={"create"} leftIcon={"fas fa-plus"}>
						Crear Solicitud
					</DropdownItem>
				) : null}
				{user.roles[1].find((value) => value === "myServices") ? (
					<DropdownItem subMenu={"myServices"} leftIcon={"fas fa-book"}>
						Mis Solicitudes
					</DropdownItem>
				) : null}
				{user.roles[1].find((value) => value === "printMyServices") ? (
					<DropdownItem subMenu={"printMyServices"} leftIcon={"fas fa-print"}>
						Imprimir Solicitud
					</DropdownItem>
				) : null}
				{user.roles[1].find((value) => value === "summary") ? (
					<DropdownItem subMenu={"summary"} leftIcon={"fas fa-calculator"}>
						Resumen
					</DropdownItem>
				) : null}
			</DropdownSub>

			<DropdownSub menu={"report"} type={"secondary"}>
                <DropdownItem goToMenu="main" leftIcon={"fas fa-arrow-left"}>
					Regresar
				</DropdownItem>
				{user.roles[1].find((value) => value === "view") ? (
                    <DropdownItem subMenu={"view"} leftIcon={"fas fa-book-open"}>
					    Ver Registros
				    </DropdownItem>
				) : null}
				{user.roles[1].find((value) => value === "print") ? (
					<DropdownItem subMenu={'print'} leftIcon={"fas fa-print"}>
						Imprimir Registro
					</DropdownItem>
				) : null}
				{user.roles[1].find((value) => value === "edit") ? (
					<DropdownItem subMenu={'edit'} leftIcon={"fas fa-edit"}>
						Editar Registro
					</DropdownItem>
				) : null}
				{user.roles[1].find((value) => value === "delete") ? (
					<DropdownItem subMenu={'delete'} leftIcon={"fas fa-trash"}>
						Eliminar Registro
					</DropdownItem>
				) : null}
				{user.roles[1].find((value) => value === "balance") ? (
					<DropdownItem subMenu={'balance'} leftIcon={"fas fa-file-invoice-dollar"}>
						Cuadrar Registros
					</DropdownItem>
				) : null}
			</DropdownSub>

			<DropdownSub menu={"config"} type={"secondary"}>
				<DropdownItem goToMenu="main" leftIcon={"fas fa-arrow-left"}>
					Regresar
				</DropdownItem>
                {user.roles[1].find((value) => value === "files") ? (
                    <DropdownItem subMenu={"files"} leftIcon={"fas fa-table"}>
                        Aseguradoras
                    </DropdownItem>
                ) : null}
                {user.roles[1].find((value) => value === "trucks") ? (
                    <DropdownItem subMenu={"trucks"} leftIcon={"fas fa-truck-pickup"} >
                        Grueros
                    </DropdownItem>                   
                ) : null}
                {user.roles[1].find((value) => value === "values") ? (
                    <DropdownItem subMenu={"values"} leftIcon={"fas fa-database"}>
                        Valores Fijos
                    </DropdownItem>
                ) : null}
			</DropdownSub>
		</div>
	);
};

export default Dropdown;
