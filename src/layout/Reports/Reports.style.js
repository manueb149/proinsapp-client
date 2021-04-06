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
