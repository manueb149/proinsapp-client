import React, { useState, createContext, useEffect } from 'react';

export const insurersContext = createContext();

const InsurersContext = (props) => {
    const [dataGraph, setDataGraph] = useState([]);
    const [result, setResult] = useState([]);
    const [filteredInsurersReports, setFilteredInsurersReports] = useState([]);
    const [filteredInsurersDates, setFilteredInsurersDates] = useState([]);

    const graphData = [
		{ name: "SERV", fill: "gold", x: 1, y: 1 },
		{ name: "SVL", fill: "teal", x: 2, y: 1 },
		{ name: "SVP", fill: "blue", x: 3, y: 1 },
		{ name: "SPV", fill: "green", x: 4, y: 1 },
		{ name: "SPB", fill: "chocolate", x: 5, y: 1 },
		{ name: "SPM", fill: "orange", x: 6, y: 1 },
		{ name: "KMR", fill: "purple", x: 7, y: 1 },
		{ name: "SD", fill: "gray", x: 8, y: 1 },
		{ name: "SN", fill: "silver", x: 9, y: 1 },
		{ name: "SF", fill: "salmon", x: 10, y: 1 },
	];

    useEffect(() => {
        const initialSetup =  () => {
            setResult(graphData);
        }
        initialSetup();
        // eslint-disable-next-line 
    }, [])

    return (
        <insurersContext.Provider
            value={{
                graphData,
                dataGraph,
                result,
                filteredInsurersReports,
                filteredInsurersDates,
                setResult,
                setDataGraph,
                setFilteredInsurersReports,
                setFilteredInsurersDates,
            }}
        >
            {props.children}
        </insurersContext.Provider>
    );
}

export default InsurersContext;