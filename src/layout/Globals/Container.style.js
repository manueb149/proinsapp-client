import styled from 'styled-components';

export const DefaultContainer = styled.div`

    background-color: var(--bg-border);

    .container-fluid{
        min-height: 100vh;
    }
    .col-sb{
        padding: 0 0 0 0;
    }
    .col-mn{
        padding: 0 2vh 2vh 2vh;
    }
    .row.header{
        border-bottom: none;
    }
`;

export default DefaultContainer;