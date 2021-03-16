import React, { useState, createContext } from 'react';

export const reportContext = createContext();

const ReportContext = (props) => {

    const [selectedReport, setSelectedReport] = useState(null);
    const [filteredReports, setFilteredReports] = useState([]);
    const [filteredDates, setFilteredDates] = useState([]);

    return (
        <reportContext.Provider
            value={{
                filteredReports,
                selectedReport,
                filteredDates,
                setFilteredReports,
                setSelectedReport,
                setFilteredDates,
            }}
        >
            {props.children}
        </reportContext.Provider>
    );
}

export default ReportContext;