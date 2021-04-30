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
    button.btn.btn-success{
        background-color: #2f793d;
    }
    button.btn.btn-success:hover{
        color: white;
        background-color: #28a745;
        transition: .15s ease-out;
        transform: scale(1.01);
    }
    button.btn.btn-warning{
        background-color: #b18606;
        color: var(--text-color);
    }
    button.btn.btn-warning:hover{
        color: white;
        background-color: #e2ab05;
        transition: .15s ease-out;
        transform: scale(1.01);
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

export const DetailsModalContainer = styled.div`
    input.form-control {
        display: inline;
    }
    div.row.check-input {
        flex-wrap: nowrap;
    }
    div.card-body {
        padding: 1rem 1rem 1rem 0rem;
    }
    .MuiCheckbox-colorSecondary.Mui-checked {
        color: var(--bg-icon);
    }
    .MuiInputBase-root.Mui-disabled {
        color: rgba(0, 0, 0, 0.5);
        cursor: default;
    }
    .MuiFormLabel-root{
        color: rgba(0, 0, 0, 0.70);
    }
    .icon-button {
        width: 35px;
        height: 35px;
        background-color: var(--bg-icon);
        border-radius: 50%;
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-right: 8px;
    }
    .icon-button:hover{
        cursor: pointer;
    }
    .fa, 
    .fas,
    .far {
        color: var(--icon-color);
    }
    .title > h5{
        margin-bottom: 0;
        line-height: unset;
        margin-right: 1rem;
    }
    .title-flex{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .form-row {
        flex-direction: row;
        justify-content: center;
    }
`;

export const LegendModalContainer = styled.div`
    .leyend{
        width: 100%;
        height: 100%;
    }
    .legend-inner{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    .legend-line{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 5px;
        padding-bottom: 3px;
    }
    .dot{
        height: 20px;
        width: 20px;
        border-radius: 50%;
        margin-right: 5px;
        border-bottom: 1px solid black;
    }
    .label{
        text-transform: uppercase;
        padding-right: 5px;
        border-bottom: 1px solid black;
    }
    .description{
        border-bottom: 1px solid black;
        white-space: pre-wrap;
    }
    .serv > .dot{
        background-color: gold;
    }
    .svl > .dot{
        background-color: teal;
    }
    .svp > .dot{
        background-color: blue;
    }
    .spv > .dot{
        background-color: green;
    }
    .spb > .dot{
        background-color: chocolate;
    }
    .spm > .dot{
        background-color: orange;
    }
    .kmr > .dot{
        background-color: purple;
    }
    .sd > .dot{
        background-color: gray;
    }
    .sn > .dot{
        background-color: silver;
    }
    .sf > .dot{
        background-color: salmon;
    }
    .est > .dot{
        background-color: red;
    }
    .sur > .dot{
        background-color: gold;
    }
    .cib > .dot{
        background-color: purple;
    }
    .sdo > .dot{
        background-color: teal;
    }
    .mao > .dot{
        background-color: blue;
    }
    .ppl > .dot{
        background-color: green;
    }
    .moc > .dot{
        background-color: silver;
    }
    .ns > .dot{
        background-color: chocolate;
    }
    .sfs > .dot{
        background-color: orange;
    }
    .as > .dot{
        background-color: gray;
    }
`;