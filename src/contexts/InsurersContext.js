import React, { useState, createContext, useEffect } from 'react';

export const insurersContext = createContext();

const InsurersContext = (props) => {
    const [dataGraph, setDataGraph] = useState([]);
    // const [dataGraphShifts, setDataGraphShifts] = useState([]);
    // const [dataGraphRegions, setDataGraphRegions] = useState([]);
    const [result, setResult] = useState([]);
    const [resultShifts, setResultShifts] = useState([]);
    const [resultRegions, setResultRegions] = useState([]);
    const [filteredInsurersReports, setFilteredInsurersReports] = useState([]);
    const [filteredInsurersDates, setFilteredInsurersDates] = useState([]);

    const graphData = [
		{ name: "SERV", fill: "Gold", x: 1, y: 1 },
        { name: "KMR", fill: "Purple", x: 2, y: 1 },
		{ name: "SVL", fill: "Teal", x: 3, y: 1 },
		{ name: "SVP", fill: "Blue", x: 4, y: 1 },
		{ name: "SPV", fill: "Green", x: 5, y: 1 },
		{ name: "SPB", fill: "Chocolate", x: 6, y: 1 },
		{ name: "SPM", fill: "Orange", x: 7, y: 1 },
		{ name: "SD", fill: "Gray", x: 8, y: 1 },
		{ name: "SF", fill: "Salmon", x: 9, y: 1 },
	];
    const graphShiftData = [
		{ name: "SD", fill: "Gray", x: 1, y: 1 },
		{ name: "SND", fill: "Silver", x: 2, y: 1 },
		{ name: "SF", fill: "Salmon", x: 3, y: 1 },
        { name: "SNF", fill: "Silver", x: 4, y: 1 },
	];
    const graphRegionsData = [
        { name: "EST", fill: "Red", x: 1, y: 1 },
		{ name: "SUR", fill: "Gold", x: 2, y: 1 },
		{ name: "CIB", fill: "Purple", x: 3, y: 1 },
		{ name: "SD", fill: "Teal", x: 4, y: 1 },
        { name: "MAO", fill: "Blue", x: 5, y: 1 },
        { name: "PPL", fill: "Green", x: 6, y: 1 },
        { name: "MOC", fill: "Silver", x: 7, y: 1 },
        { name: "NS", fill: "Chocolate", x: 8, y: 1 },
        { name: "SFS", fill: "Orange", x: 9, y: 1 },
        { name: "AS", fill: "Gray", x: 10, y: 1 },
	];

    useEffect(() => {
        const initialSetup =  () => {
            setResult(graphData);
            setResultShifts(graphShiftData);
            setResultRegions(graphRegionsData);
        }
        initialSetup();
        // eslint-disable-next-line 
    }, [])

    return (
        <insurersContext.Provider
            value={{
                graphData,
                graphShiftData,
                graphRegionsData,
                dataGraph,
                result,
                resultShifts,
                resultRegions,
                filteredInsurersReports,
                filteredInsurersDates,
                setResult,
                setResultShifts,
                setResultRegions,
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