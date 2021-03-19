import React, { useState, createContext } from 'react';

export const insurersContext = createContext();

const InsurersContext = (props) => {
    const [filteredInsurersReports, setFilteredInsurersReports] = useState([]);
    const [filteredInsurersDates, setFilteredInsurersDates] = useState([]);

    return (
        <insurersContext.Provider
            value={{
                filteredInsurersReports,
                filteredInsurersDates,
                setFilteredInsurersReports,
                setFilteredInsurersDates,
            }}
        >
            {props.children}
        </insurersContext.Provider>
    );
}

export default InsurersContext;