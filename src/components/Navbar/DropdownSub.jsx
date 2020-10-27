import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
// Conectext for DropDown menu
import { navbarContext } from '../../contexts/NavbarContext';

const DropdownSub = ({children, menu, type}) => {

    const NavbarContext = useContext(navbarContext);
    const {activeMenu, calcHeight} = NavbarContext;

    return (
        <CSSTransition
            in={activeMenu === menu}
            timeout={500}
            classNames={`menu-${type}`}
            unmountOnExit
            onEnter={calcHeight}
        >
            <div className="menu">
                {children}
            </div>
        </CSSTransition>
    );
}

export default DropdownSub;