import React, { useState, createContext } from 'react';

export const serviceReportContext = createContext();

const ServiceReportContext = (props) => {

    const [selectedServiceReport, setSelectedServiceReport] = useState(null);

    return (
        <serviceReportContext.Provider
            value={{
                selectedServiceReport,
                setSelectedServiceReport
            }}
        >
            {props.children}
        </serviceReportContext.Provider>
    );
}

export default ServiceReportContext;