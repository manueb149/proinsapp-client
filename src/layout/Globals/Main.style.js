import styled from 'styled-components';

export const MainContainer = styled.div`

    background-color: var(--bg-main);
    height: 87vh;
    padding: 10px 10px;
    border-radius: 10px;
    overflow: scroll;
    overflow-x: hidden;

    .card{
        border-radius: var(--border-radius);
    }

    input.form-check-input.rad{
        margin-top: 0rem !important;
    }
    table.archivo.table{
        margin-bottom: 0px;
    }
    ::-webkit-scrollbar {
        width: 10px;  /* Remove scrollbar space */
        /* background-color: red;  Optional: just make scrollbar invisible */
        border-radius: 1px;
    }
    ::-webkit-scrollbar-thumb {
        background: #c2c2c2;
        border-bottom-right-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius); 
    }
`;

export default MainContainer;