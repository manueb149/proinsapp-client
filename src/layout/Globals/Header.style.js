import styled from 'styled-components';

export const HeaderContainer = styled.div`
    
    box-sizing: content-box;
    background-color: var(--bg-header);
    width: 100%;
    margin: 0 2vh 2vh 2vh;
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    overflow: hidden;

    .header-inner{
        position: relative;
        margin: 2vh 0px;
        height: 5vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .user-conf:hover{
        cursor: pointer;
    }
    .user-conf .fas{
        font-size: 35px;
        color: var(--user-icon-color);
        text-align: center;
    }
    .user-conf .fa{
        font-size: 35px;
        color: var(--user-icon-color);
        text-align: center;
    }
    img{
        width: auto;
        height: 6.5vh;
    }
    h1{
        margin: 0px;
        padding-top: 3px;
        line-height: 1;
        font-size: 25px;
        font-weight: 500;
        font-family: 'Odibee Sans', cursive; 
        border-top: 3px solid #fff;
        border-bottom: 3px solid #fff;
    }
    a{
        color: #7ddaff;
        text-decoration: none;
    }
    a:link, a:visited{
        color: #7ddaff;
    }
`;

export default HeaderContainer;