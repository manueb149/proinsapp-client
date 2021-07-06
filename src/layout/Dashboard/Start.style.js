import styled from 'styled-components';

export const StartContainer = styled.div`
    .card-header {
        padding: 0.4rem 0.5rem;
        text-transform: uppercase;
        text-align: center;
        border-radius: 0px;
    }
    .card{
        border-radius: 0px;
        border-top: none;
    }
    .card-body{
        padding-top: 1rem;
    }
    label{
        font-weight: 400;
    }
    .form-check-input{
        margin-top: 0.2rem !important;
    }
    button.close.rbt-close.rbt-token-remove-button{
        padding: 0px;
        top: 0px;
        transform: translate(50%,32%);
        -webkit-transform: translate(50%,32%);
        -ms-transform: translate(50%,32%);
        border-radius: 50%;
        width: 13px;
        height: 13px;
    }
    button.close{
        line-height: 0.9;
        color: white;
    }
    .MuiIconButton-root.MuiIconButton-root{
        transform: translate(5%,20%);
        border-radius: 50%
    }
    button.MuiIconButton-root.MuiIconButton-root:hover{
        background-color: rgba(0,0,0,0.4);
    }
    button.MuiButtonBase-root.MuiIconButton-root{
        background-color: rgba(0,0,0,0.1);
    }
    .MuiFormControl-root.date-picker{
        min-width: 100%;
    }
    .PhoneInputInput {
        border: none;
    }
    a, a:hover, a:active ,a:visited {
        text-decoration: none;
        color: black !important;
    }
    .MuiTableContainer-root{
        border-radius: 0px;
        height: 65vh;
        overflow-y: auto;
    }
`;