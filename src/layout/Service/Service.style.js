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
`;