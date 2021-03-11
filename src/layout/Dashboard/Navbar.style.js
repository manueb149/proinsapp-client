import styled from 'styled-components';

const NavbarDashboard = styled.div`
    
    height: 100%;

    .navbar{
        position: relative;
        /* height: 100%; */
        height: 87vh;
        /* overflow-x: scroll; */
        padding: 0 15px;
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .navbar-nav{
        padding: 0 0 10px 0;
        width: 100%;
    }
    .nav-item{
        width: 100%;
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    .dropdown {
        border-radius: var(--border-radius);
        overflow: hidden;
        transition: height var(--speed) ease;
    }
    .menu {
        width: 100%;
    }
    .menu-item {
        height: auto;
        display: flex;
        align-items: center;
        border-radius: 20px;
        transition: background var(--speed);
        margin-bottom: 10px;
        cursor: pointer;
    }
    .menu-item .icon-button:hover {
        filter: none;
    }
    .menu-item:hover {
        background-color: #525357;
    }
    .icon-button{
        width: 35px;
        height: 35px;
        background-color: var(--bg-icon);
        border-radius: 50%;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
    }
    /* CSSTransition classes  */
    .menu-primary-enter {
        position: absolute;
        transform: translateX(-110%);
    }
    .menu-primary-enter-active {
        transform: translateX(0%);
        transition: all var(--speed) ease;
    }
    .menu-primary-exit {
        position: absolute;
    }
    .menu-primary-exit-active {
        transform: translateX(-110%);
        transition: all var(--speed) ease;
    }
    .menu-secondary-enter {
        transform: translateX(110%);
    }
    .menu-secondary-enter-active {
        transform: translateX(0%);
        transition: all var(--speed) ease;
    }
    .menu-secondary-exit {
        position: absolute
    }
    .menu-secondary-exit-active {
        transform: translateX(110%);
        transition: all var(--speed) ease;
    }
    .fa,
    .fas,
    .far{
        color: var(--icon-color);
    }

    @media (max-width: 768px) {
        .navbar{
            height: 100%;
            overflow-x: none;
        }
}
`;

export default NavbarDashboard;