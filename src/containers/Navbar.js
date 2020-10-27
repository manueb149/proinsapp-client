import React, { useEffect, useContext } from "react";
// Import Dropdown for menus of dropdown
import Dropdown from "../components/Navbar/Dropdown";
// Conectext for DropDown menu
import { navbarContext } from '../contexts/NavbarContext';
// Import styled component for navbar
import NavbarDashboard from "../layout/Dashboard/Navbar.style";

const Navbar = () => {

	const NavbarContext = useContext(navbarContext);
	const {dropdownRef, setMenuHeight} = NavbarContext;

	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
		// eslint-disable-next-line
	}, [dropdownRef]);

	return (
		<NavbarDashboard>
			<nav className="navbar">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Dropdown />
					</li>
				</ul>
			</nav>
		</NavbarDashboard>
	);
};

export default Navbar;
