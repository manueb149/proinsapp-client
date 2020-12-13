import styled from 'styled-components';

export const CreateServiceContainer = styled.div`
    .card-header {
        padding: 0.4rem 0.5rem;
        text-transform: uppercase;
    }
    .card-body{
        padding-bottom: 0px;
        padding-top: 1rem;
    }
    label{
        font-weight: 400;
    }
    button{
        border-radius: var(--border-radius);
        background-color: var(--bg-icon);
        margin-bottom: 10px;
        margin-right: 10px;
        color: var(--text-color);
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
`;

export const SummaryContainer = styled.div`
    input.form-control{
        display: inline;
    }
    div.row.check-input{
        flex-wrap: nowrap;
    }
    div.card-body {
        padding: 1rem 0rem 1rem 0rem;
    }
    div.card-body.datos-viaje {
        padding: 1rem 0rem 1rem 1rem;
    }
    .MuiCheckbox-colorSecondary.Mui-checked {
        color: var(--bg-icon);
    }
    .MuiInput-underline:after {
        border-bottom: 2px solid black;
        transform: scaleX(1);
    }
    .MuiInputBase-root.Mui-disabled {
        color: rgba(0, 0, 0, 0.5);
        cursor: default;
    }
    .MuiFormLabel-root{
        color: rgba(0, 0, 0, 0.70);
    }
`;