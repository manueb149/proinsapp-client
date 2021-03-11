import styled from 'styled-components';
import backgroundImg from '../../assets/bg_loginn.png';

export const LoginContainer = styled.div`
/* background: url(${backgroundImg}) no-repeat fixed; */
    .container-fluid{
        min-height: 100vh;
        background: url(${backgroundImg}) no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        position: relative;
        z-index: 0;
        color: #035AA6;
    }
    .overlay{
        background-color: #00203CB3;
        opacity: 0.7;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        img{
            width: 100%;
            height: 100%;
        }
    }    
`;

export const LoginHeader = styled.div`
    margin-top: 1rem;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        width: auto;
        height: 100%;
    }
    h1{
        margin: 0px;
        padding-top: 5px;
        font-size: 40px;
        font-weight: 500;
        font-family: 'Odibee Sans', cursive; 
        /*border-top: 2px solid #fff;
        border-bottom: 2px solid #fff;*/
        color: #3f7fd2;
    }
    a{
        color: #7ddaff;
        text-decoration: none;
    }
    a:link, a:visited{
        color: #7ddaff;
    }
    img.i-head{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        width: 30px;
        height: auto;
        justify-content: center;
        align-items: center;
        float: left;
        margin-top: 5px;
        margin-right: 5px;
        fill: white;
        
    }
    span.i-title{
        color: #ffffff;
    }
`;

export const LoginForm = styled.div`
    margin-top: 20vh;
    padding: 15px;
    position: relative;
    border: 5px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    background-color: rgba(0,0,0,1);
    opacity: 0.94;
    z-index: 0;
    box-shadow: 0 0 10px 10px rgba(30, 50, 55, 0.4),0 0 10px rgba(81,203,238,0.6);
    .login-title{
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 30px;
        color:#034AA6; 
    }
    form .form-group{
        margin-bottom: 25px;
    }
    .form-control:focus {
        border-color: 3px solid rgba(81, 203, 238, 1);
        box-shadow: inset 0 2px 1px rgba(81, 203, 238, 0.075), 0 0 10px rgba(81, 203, 238, 0.6);
    }
    form .btn-box{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    form .btn-single{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div.row.showpassword{
        margin-right: 0px;
        margin-left: 0px;
        flex-wrap: nowrap;
    }
   .eye:hover{
        cursor: pointer;
    }
    .eye{
        display: flex;
        padding-left: 10px;
        padding-right: 2px;
        align-items: center;
        transform: scale(1.2);
    }
`;