import React, { useState, createContext } from 'react';

export const reportContext = createContext();

const ReportContext = (props) => {

    const [selectedReport, setSelectedReport] = useState(null);

    return (
        <reportContext.Provider
            value={{
                selectedReport: selectedReport,
                setSelectedReport: setSelectedReport
            }}
        >
            {props.children}
        </reportContext.Provider>
    );
}

export default ReportContext;