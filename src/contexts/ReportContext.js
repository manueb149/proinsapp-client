import React, { useState, createContext } from 'react';

export const reportContext = createContext();

const ReportContext = (props) => {

    const [selectedReport, setSelectedReport] = useState(null);
    const [filteredReports, setFilteredReports] = useState([]);
    const [filteredDates, setFilteredDates] = useState([]);
    const [currTable, setCurrTable] = useState([]);

    return (
        <reportContext.Provider
            value={{
                filteredReports,
                selectedReport,
                filteredDates,
                currTable,
                setFilteredReports,
                setSelectedReport,
                setFilteredDates,
                setCurrTable,
            }}
        >
            {props.children}
        </reportContext.Provider>
    );
}

export default ReportContext;