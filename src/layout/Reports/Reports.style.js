import styled from 'styled-components';

export const ReportsContainer = styled.div`
    .MuiTableCell-paddingCheckbox{
        background-color: #fff;
    }
    div.MuiFormControl-root.MuiTextField-root.date-picker{
        margin-right: 10px;
    }
    .MuiTableCell-root{
        padding: 10px !important;
        line-height: 1 !important;
    }
    .MuiTablePagination-toolbar{
        min-height: 100% !important;
    }
    .canvasjs-chart-credit{
        opacity: 0.1;
    }
    .VictoryContainer{
        height: 70vh !important;
    }
`;

export const GraphReportsContainer = styled.div`
    .VictoryContainer{
        height: 100% !important;
    }
    div.MuiFormControl-root.MuiTextField-root.date-picker{
        margin-right: 10px;
    }
    button{
        border-radius: var(--border-radius);
        margin-bottom: 10px;
        margin-right: 10px;
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
`;

export const DeleteReportContainer = styled.div`
    button{
        border-radius: var(--border-radius);
        background-color: var(--bg-icon);
        margin-bottom: 10px;
        margin-right: 10px;
        color: var(--text-color);
    }
    button.btn.btn-danger{
        background-color: #a20b0b;
    }
    button.btn.btn-danger:hover{
        color: white;
        background-color: #e81a1a;
        transition: .15s ease-out;
        transform: scale(1.01);
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
