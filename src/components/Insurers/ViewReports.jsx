import React, { useState, useEffect, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { insurersContext } from "../../contexts/InsurersContext";
import { serviceDataContext } from "../../contexts/ServiceDataContext";
import { GraphReportsContainer } from "../../layout/Reports/Reports.style";
import moment from "moment-timezone";
import { Button } from "react-bootstrap";
import DatePicker from "../utils/DatePicker";
import axios from "../../config/http-common";
import filterReportsByDate from "../utils/filterReportsByDate";
import AuthContext from "../../contexts/auth/authContext";
import getServiceType from "../utils/getServiceType";
import GraphViewer from "./GraphReport";
import LegendModal from "./LegendModal";
import SnackBar from "../utils/SnackBar";
import getUserPrivileges from "../utils/getActiveMenu";
import { LegendModalContainer } from "../../layout/Service/Service.style";
moment().tz("America/Santo_Domingo").format();


const ViewReport = () => {

	const [showLegend, setShowLegend] = useState(false);
	const [selectedDateStart, handleDateChangeStart] = useState(new Date());
	const [selectedDateEnd, handleDateChangeEnd] = useState(new Date());
	const [filtering, setFiltering] = useState(false);
	const [cleaning, setCleaning] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [openSB, setOpenSB] = useState(false);
	const history = useHistory();

	const ServiceDataContext = useContext(serviceDataContext);
	const { severity, setSeverity, notification, setNotification } = ServiceDataContext;
	const authContext = useContext(AuthContext);
	const { logout, user } = authContext;
	const InsurersContext = useContext(insurersContext);
	const {
		graphData,
		graphShiftData,
		graphRegionsData,
		dataGraph,
		result,
		resultShifts,
		resultRegions,
		setResult,
		setResultShifts,
		setResultRegions,
		setDataGraph,
	} = InsurersContext;


	useEffect(() => {
		const getReports = async () => {
			try {
				await axios
					.get(`/service`)
					.then((res) => {
						const newData = res.data.results.map(
							(value) => ({
								...value,
								servicios: getServiceType(value["tipoServicios"]),
							})
						);
						// const filteredData = newData.filter((value) => value.aseguradora === String(user.name).toUpperCase());
						const filteredData = newData.filter((value) => value.aseguradora === String("la internacional").toUpperCase());
						setDataGraph(filteredData);

						const SERV = dataGraph.length === 0 ? filteredData.length : dataGraph.length

						const SVL = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)

						const SVP = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (!["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (!["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)

						const SPV = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.plan === "PLAN VIP" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.plan === "PLAN VIP" ? ++acc : acc), 0)

						const SPB = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.plan === "PLAN BASICO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.plan === "PLAN BASICO" ? ++acc : acc), 0)

						const SPM = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.plan === "PLAN MINIBUS" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.plan === "PLAN MINIBUS" ? ++acc : acc), 0)

						const KMR = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.distancia >= 0 ? acc += cur.distancia : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.distancia >= 0 ? acc += cur.distancia : acc), 0)

						const SD = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.dia === "DN" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.dia === "DN" ? ++acc : acc), 0)

						const SND = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.noche && cur.dia === "DN" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.noche && cur.dia === "DN" ? ++acc : acc), 0)

						const SF = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)

						const SNF = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.noche && cur.dia === "DF" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.noche && cur.dia === "DF" ? ++acc : acc), 0)

						const EST = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "REGION ESTE" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "REGION ESTE" ? ++acc : acc), 0)

						const SUR = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "REGION SUR" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "REGION SUR" ? ++acc : acc), 0)

						const CIB = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "REGION CIBAO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "REGION CIBAO" ? ++acc : acc), 0)

						const SDO = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "SANTO DOMINGO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "SANTO DOMINGO" ? ++acc : acc), 0)

						const MAO = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "MAO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "MAO" ? ++acc : acc), 0)

						const PPL = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "PUERTO PLATA" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "PUERTO PLATA" ? ++acc : acc), 0)

						const MOC = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "MOCA" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "MOCA" ? ++acc : acc), 0)

						const NS = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "NAGUA-SAMANA" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "NAGUA-SAMANA" ? ++acc : acc), 0)

						const SFS = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "SAN FRANCISCO-SALCEDO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "SAN FRANCISCO-SALCEDO" ? ++acc : acc), 0)

						const AS = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.datosGruero.region === "ASISTENCIAS" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "ASISTENCIAS" ? ++acc : acc), 0)



						const graphDataUpd = graphData.map(value => {
							if (value.x === 1) { return { ...value, y: SERV } }
							else if (value.x === 2) { return { ...value, y: Number((KMR / 1000).toFixed(3)), label: Number((KMR / 1000).toFixed(3)) + 'k' } }
							else if (value.x === 3) { return { ...value, y: SVL } }
							else if (value.x === 4) { return { ...value, y: SVP } }
							else if (value.x === 5) { return { ...value, y: SPV } }
							else if (value.x === 6) { return { ...value, y: SPB } }
							else if (value.x === 7) { return { ...value, y: SPM } }
							else if (value.x === 8) { return { ...value, y: SD } }
							else if (value.x === 9) { return { ...value, y: SF } }
							else { return { ...value } }
						});
						const graphShiftDataUpd = graphShiftData.map(value => {
							if (value.x === 1) { return { ...value, y: SD } }
							else if (value.x === 2) { return { ...value, y: SND } }
							else if (value.x === 3) { return { ...value, y: SF } }
							else if (value.x === 4) { return { ...value, y: SNF } }
							else { return { ...value } }
						});
						const graphRegionsDataUpd = graphRegionsData.map(value => {
							if (value.x === 1) { return { ...value, y: EST } }
							else if (value.x === 2) { return { ...value, y: SUR } }
							else if (value.x === 3) { return { ...value, y: CIB } }
							else if (value.x === 4) { return { ...value, y: SDO } }
							else if (value.x === 5) { return { ...value, y: MAO } }
							else if (value.x === 6) { return { ...value, y: PPL } }
							else if (value.x === 7) { return { ...value, y: MOC } }
							else if (value.x === 8) { return { ...value, y: NS } }
							else if (value.x === 9) { return { ...value, y: SFS } }
							else if (value.x === 10) { return { ...value, y: AS } }
							else { return { ...value } }
						});
						setResult(graphDataUpd);
						setResultShifts(graphShiftDataUpd);
						setResultRegions(graphRegionsDataUpd);

					})
					.catch((error) => {
						if (error.response) {
							// Request made and server responded
							if (error.response.data.text === "TNV") {
								logout();
								history.push("/");
							}
							// console.log(error.response.status);
							// console.log(error.response.headers);
						} else if (error.request) {
							// The request was made but no response was received
							console.log(error.request);
						} else {
							// Something happened in setting up the request that triggered an Error
							console.log("Error", error.message);
						}
					});
			} catch (error) {
				console.log(error.response.data);
			}
		};
		getReports();
		// eslint-disable-next-line
	}, []);

	const handleFilter = () => {
		setFiltering(true);
		const getReports = () => {
			try {
				axios
					.get(`/service`)
					.then((res) => {
						// const filteredData = res.data.results.filter(
						// 	(value) =>
						// 		value.aseguradora ===
						// 		String(user.name).toUpperCase()
						// );
						const filteredData = res.data.results.filter(
							(value) =>
								value.aseguradora ===
								String("la internacional").toUpperCase()
						);
						const filteredDataDate = filterReportsByDate(
							filteredData,
							selectedDateStart,
							selectedDateEnd
						);
						if (filteredDataDate.length !== 0) {
							setDataGraph(filteredDataDate)
						} else {
							setOpenSB(false);
							setSeverity("error");
							setNotification("No se han encontrado registros");
							setOpenSB(true);
						}
						setFiltering(false);

						const SERV = filteredDataDate.length !== 0 ? filteredDataDate.length : dataGraph.length

						const SVL = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)

						const SVP = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (!["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (!["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)

						const SPV = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.plan === "PLAN VIP" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.plan === "PLAN VIP" ? ++acc : acc), 0)

						const SPB = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.plan === "PLAN BASICO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.plan === "PLAN BASICO" ? ++acc : acc), 0)

						const SPM = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.plan === "PLAN MINIBUS" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.plan === "PLAN MINIBUS" ? ++acc : acc), 0)

						const KMR = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.distancia >= 0 ? acc += cur.distancia : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.distancia >= 0 ? acc += cur.distancia : acc), 0)

						const SD = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.dia === "DN" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.dia === "DN" ? ++acc : acc), 0)

						const SND = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.noche && cur.dia === "DN" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.noche && cur.dia === "DN" ? ++acc : acc), 0)

						const SF = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)

						const SNF = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.noche && cur.dia === "DF" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.noche && cur.dia === "DF" ? ++acc : acc), 0)

						const EST = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "REGION ESTE" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "REGION ESTE" ? ++acc : acc), 0)

						const SUR = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "REGION SUR" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "REGION SUR" ? ++acc : acc), 0)

						const CIB = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "REGION CIBAO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "REGION CIBAO" ? ++acc : acc), 0)

						const SDO = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "SANTO DOMINGO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "SANTO DOMINGO" ? ++acc : acc), 0)

						const MAO = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "MAO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "MAO" ? ++acc : acc), 0)

						const PPL = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "PUERTO PLATA" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "PUERTO PLATA" ? ++acc : acc), 0)

						const MOC = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "MOCA" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "MOCA" ? ++acc : acc), 0)

						const NS = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "NAGUA-SAMANA" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "NAGUA-SAMANA" ? ++acc : acc), 0)

						const SFS = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "SAN FRANCISCO-SALCEDO" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "SAN FRANCISCO-SALCEDO" ? ++acc : acc), 0)

						const AS = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.datosGruero.region === "ASISTENCIAS" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "RASISTENCIAS" ? ++acc : acc), 0)

						const graphDataUpd = graphData.map(value => {
							if (value.x === 1) { return { ...value, y: SERV } }
							else if (value.x === 2) { return { ...value, y: Number((KMR / 1000).toFixed(3)), label: Number((KMR / 1000).toFixed(3)) + 'k' } }
							else if (value.x === 3) { return { ...value, y: SVL } }
							else if (value.x === 4) { return { ...value, y: SVP } }
							else if (value.x === 5) { return { ...value, y: SPV } }
							else if (value.x === 6) { return { ...value, y: SPB } }
							else if (value.x === 7) { return { ...value, y: SPM } }
							else if (value.x === 8) { return { ...value, y: SD } }
							else if (value.x === 9) { return { ...value, y: SF } }
							else { return { ...value } }
						});
						const graphShiftDataUpd = graphShiftData.map(value => {
							if (value.x === 1) { return { ...value, y: SD } }
							else if (value.x === 2) { return { ...value, y: SND } }
							else if (value.x === 3) { return { ...value, y: SF } }
							else if (value.x === 4) { return { ...value, y: SNF } }
							else { return { ...value } }
						});
						const graphRegionsDataUpd = graphRegionsData.map(value => {
							if (value.x === 1) { return { ...value, y: EST } }
							else if (value.x === 2) { return { ...value, y: SUR } }
							else if (value.x === 3) { return { ...value, y: CIB } }
							else if (value.x === 4) { return { ...value, y: SDO } }
							else if (value.x === 5) { return { ...value, y: MAO } }
							else if (value.x === 6) { return { ...value, y: PPL } }
							else if (value.x === 7) { return { ...value, y: MOC } }
							else if (value.x === 8) { return { ...value, y: NS } }
							else if (value.x === 9) { return { ...value, y: SFS } }
							else if (value.x === 10) { return { ...value, y: AS } }
							else { return { ...value } }
						});
						setResult(graphDataUpd);
						setResultShifts(graphShiftDataUpd);
						setResultRegions(graphRegionsDataUpd);

					})
					.catch((error) => {
						if (error.response) {
							// Request made and server responded
							if (error.response.data.text === "TNV") {
								logout();
								history.push("/");
							}
							// console.log(error.response.status);
							// console.log(error.response.headers);
						} else if (error.request) {
							// The request was made but no response was received
							console.log(error.request);
						} else {
							// Something happened in setting up the request that triggered an Error
							console.log("Error", error.message);
						}
					});
			} catch (error) {
				console.log(error.response.data);
			}
		};
		getReports();
	};

	const handleClear = () => {
		setCleaning(true);
		const getReports = async () => {
			try {
				await axios
					.get(`/service`)
					.then((res) => {
						const newData = res.data.results.map(
							(value, index) => ({
								...value,
								servicios: getServiceType(
									value["tipoServicios"]
								),
							})
						);
						// const filteredData = newData.filter((value) => value.aseguradora === String(user.name).toUpperCase());
						const filteredData = newData.filter((value) => value.aseguradora === String("la internacional").toUpperCase());
						setDataGraph(filteredData);
						setCleaning(false);

						const SERV = filteredData.length
						const SVL = filteredData.reduce((acc, cur) => (["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)
						const SVP = filteredData.reduce((acc, cur) => (!["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0)
						const SPV = filteredData.reduce((acc, cur) => (cur.plan === "PLAN VIP" ? ++acc : acc), 0)
						const SPB = filteredData.reduce((acc, cur) => (cur.plan === "PLAN BASICO" ? ++acc : acc), 0)
						const SPM = filteredData.reduce((acc, cur) => (cur.plan === "PLAN MINIBUS" ? ++acc : acc), 0)
						const KMR = filteredData.reduce((acc, cur) => (cur.distancia >= 0 ? acc += cur.distancia : acc), 0)
						const SD = filteredData.reduce((acc, cur) => (cur.dia === "DN" ? ++acc : acc), 0)
						const SND = filteredData.reduce((acc, cur) => (cur.noche && cur.dia === "DN" ? ++acc : acc), 0)
						const SF = filteredData.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)
						const SNF = filteredData.reduce((acc, cur) => (cur.noche && cur.dia === "DF" ? ++acc : acc), 0)
						const EST = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "REGION ESTE" ? ++acc : acc), 0)
						const SUR = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "REGION SUR" ? ++acc : acc), 0)
						const CIB = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "REGION CIBAO" ? ++acc : acc), 0)
						const SDO = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "SANTO DOMINGO" ? ++acc : acc), 0)
						const MAO = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "MAO" ? ++acc : acc), 0)
						const PPL = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "PUERTO PLATA" ? ++acc : acc), 0)
						const MOC = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "MOCA" ? ++acc : acc), 0)
						const NS = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "NAGUA-SAMANA" ? ++acc : acc), 0)
						const SFS = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "SAN FRANCISCO-SALCEDO" ? ++acc : acc), 0)
						const AS = filteredData.reduce((acc, cur) => (cur.datosGruero.region === "ASISTENCIAS" ? ++acc : acc), 0)

						const graphDataUpd = graphData.map((value, index) => {
							if (value.x === 1) { return { ...value, y: SERV } }
							else if (value.x === 2) { return { ...value, y: Number((KMR / 1000).toFixed(3)), label: Number((KMR / 1000).toFixed(3)) + 'k' } }
							else if (value.x === 3) { return { ...value, y: SVL } }
							else if (value.x === 4) { return { ...value, y: SVP } }
							else if (value.x === 5) { return { ...value, y: SPV } }
							else if (value.x === 6) { return { ...value, y: SPB } }
							else if (value.x === 7) { return { ...value, y: SPM } }
							else if (value.x === 8) { return { ...value, y: SD } }
							else if (value.x === 9) { return { ...value, y: SF } }
							else { return { ...value } }
						});
						const graphShiftDataUpd = graphShiftData.map(value => {
							if (value.x === 1) { return { ...value, y: SD } }
							else if (value.x === 2) { return { ...value, y: SND } }
							else if (value.x === 3) { return { ...value, y: SF } }
							else if (value.x === 4) { return { ...value, y: SNF } }
							else { return { ...value } }
						});
						const graphRegionsDataUpd = graphRegionsData.map(value => {
							if (value.x === 1) { return { ...value, y: EST } }
							else if (value.x === 2) { return { ...value, y: SUR } }
							else if (value.x === 3) { return { ...value, y: CIB } }
							else if (value.x === 4) { return { ...value, y: SDO } }
							else if (value.x === 5) { return { ...value, y: MAO } }
							else if (value.x === 6) { return { ...value, y: PPL } }
							else if (value.x === 7) { return { ...value, y: MOC } }
							else if (value.x === 8) { return { ...value, y: NS } }
							else if (value.x === 9) { return { ...value, y: SFS } }
							else if (value.x === 10) { return { ...value, y: AS } }
							else { return { ...value } }
						});
						setResult(graphDataUpd);
						setResultShifts(graphShiftDataUpd);
						setResultRegions(graphRegionsDataUpd);
						handleDateChangeStart(new Date());
						handleDateChangeEnd(new Date());

					})
					.catch((error) => {
						if (error.response) {
							// Request made and server responded
							if (error.response.data.text === "TNV") {
								logout();
								history.push("/");
							}
							// console.log(error.response.status);
							// console.log(error.response.headers);
						} else if (error.request) {
							// The request was made but no response was received
							console.log(error.request);
						} else {
							// Something happened in setting up the request that triggered an Error
							console.log("Error", error.message);
						}
					});
			} catch (error) {
				console.log(error.response.data);
			}
		};
		getReports();
	};

	const handleCloseSB = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSB(false);
	};

	const handleUpdate = () => {
		setUpdating(true);
		const SERV = dataGraph.length;
		const SVL = dataGraph.reduce((acc, cur) => (["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0);
		const SVP = dataGraph.reduce((acc, cur) => (!["AUTOMOVIL", "JEEP"].includes(cur.tipoVehiculo) ? ++acc : acc), 0);
		const SPV = dataGraph.reduce((acc, cur) => (cur.plan === "PLAN VIP" ? ++acc : acc), 0);
		const SPB = dataGraph.reduce((acc, cur) => (cur.plan === "PLAN BASICO" ? ++acc : acc), 0);
		const SPM = dataGraph.reduce((acc, cur) => (cur.plan === "PLAN MINIBUS" ? ++acc : acc), 0);
		const KMR = dataGraph.reduce((acc, cur) => (cur.distancia >= 0 ? acc += cur.distancia : acc), 0);
		const SD = dataGraph.reduce((acc, cur) => (cur.dia === "DN" ? ++acc : acc), 0);
		const SND = dataGraph.reduce((acc, cur) => (cur.noche && cur.dia === "DN" ? ++acc : acc), 0);
		const SF = dataGraph.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0);
		const SNF = dataGraph.reduce((acc, cur) => (cur.noche && cur.dia === "DF" ? ++acc : acc), 0);
		const EST = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "REGION ESTE" ? ++acc : acc), 0)
		const SUR = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "REGION SUR" ? ++acc : acc), 0)
		const CIB = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "REGION CIBAO" ? ++acc : acc), 0)
		const SDO = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "SANTO DOMINGO" ? ++acc : acc), 0)
		const MAO = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "MAO" ? ++acc : acc), 0)
		const PPL = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "PUERTO PLATA" ? ++acc : acc), 0)
		const MOC = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "MOCA" ? ++acc : acc), 0)
		const NS = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "NAGUA-SAMANA" ? ++acc : acc), 0)
		const SFS = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "SAN FRANCISCO-SALCEDO" ? ++acc : acc), 0)
		const AS = dataGraph.reduce((acc, cur) => (cur.datosGruero.region === "ASISTENCIAS" ? ++acc : acc), 0)

		const graphDataUpd = graphData.map(value => {
			if (value.x === 1) { return { ...value, y: SERV } }
			else if (value.x === 2) { return { ...value, y: Number((KMR / 1000).toFixed(3)), label: Number((KMR / 1000).toFixed(3)) + 'k' } }
			else if (value.x === 3) { return { ...value, y: SVL } }
			else if (value.x === 4) { return { ...value, y: SVP } }
			else if (value.x === 5) { return { ...value, y: SPV } }
			else if (value.x === 6) { return { ...value, y: SPB } }
			else if (value.x === 7) { return { ...value, y: SPM } }
			else if (value.x === 8) { return { ...value, y: SD } }
			else if (value.x === 9) { return { ...value, y: SF } }
			else { return { ...value } }
		});
		const graphShiftDataUpd = graphShiftData.map(value => {
			if (value.x === 1) { return { ...value, y: SD } }
			else if (value.x === 2) { return { ...value, y: SND } }
			else if (value.x === 3) { return { ...value, y: SF } }
			else if (value.x === 4) { return { ...value, y: SNF } }
			else { return { ...value } }
		});
		const graphRegionsDataUpd = graphRegionsData.map(value => {
			if (value.x === 1) { return { ...value, y: EST } }
			else if (value.x === 2) { return { ...value, y: SUR } }
			else if (value.x === 3) { return { ...value, y: CIB } }
			else if (value.x === 4) { return { ...value, y: SDO } }
			else if (value.x === 5) { return { ...value, y: MAO } }
			else if (value.x === 6) { return { ...value, y: PPL } }
			else if (value.x === 7) { return { ...value, y: MOC } }
			else if (value.x === 8) { return { ...value, y: NS } }
			else if (value.x === 9) { return { ...value, y: SFS } }
			else if (value.x === 10) { return { ...value, y: AS } }
			else { return { ...value } }
		});
		setResult(graphDataUpd);
		setResultShifts(graphShiftDataUpd);
		setResultRegions(graphRegionsDataUpd);
		setUpdating(false);
	};

	return (
		<GraphReportsContainer>
			<SnackBar
				severity={severity}
				notification={notification}
				openSB={openSB}
				handleOpenSB={() => setOpenSB(true)}
				handleCloseSB={handleCloseSB}
			/>

			<LegendModal
				showLegend={showLegend}
				setShowLegend={setShowLegend}
			/>

			<div className="date-picker">
				<div className="col-lg-12 mb-3">
					<DatePicker
						MaxDate
						MinDate
						label="Fecha Inicial"
						selectedDate={selectedDateStart}
						handleDateChange={handleDateChangeStart}
					/>
					<DatePicker
						MaxDate
						MinDate
						label="Fecha Final"
						selectedDate={selectedDateEnd}
						handleDateChange={handleDateChangeEnd}
					/>
					<Button
						style={{ marginTop: "5px", marginRight: "5px" }}
						onClick={handleFilter}
						disabled={filtering}
						size="sm"
					>
						{filtering ? "Filtrando" : "Filtrar"}
					</Button>
					<Button
						variant="warning"
						style={{ marginTop: "5px", marginRight: "5px" }}
						onClick={handleClear}
						disabled={cleaning}
						size="sm"
					>
						{cleaning ? "Procesando" : "Limpiar"}
					</Button>
					<Button
						style={{ marginTop: "5px", marginRight: "5px" }}
						variant="info"
						onClick={() => handleUpdate()}
						disabled={updating}
						size="sm"
					>
						{updating ? "Actualizando" : "Actualizar"}
					</Button>
					<Button
						style={{ marginTop: "5px", marginRight: "5px" }}
						variant="success"
						size="sm"
						onClick={() => setShowLegend(true)}
					>
						Leyenda
					</Button>
				</div>
			</div>
			<div style={{ padding: "0 5vw" }}>
				{getUserPrivileges(user.name)[0] === 'main'
					? (
						<Fragment>
							<h4 style={{ textAlign: "center", marginTop: "40px", marginBottom: "-30px", color: "#0042a3" }}>Gráfico General</h4>
							<GraphViewer padding={{ y: 0, x: 20 }} graphData={result} />
							<div style={{
								width: "100%", height: "100%", paddingBottom: "30px", display: "flex", flexDirection: "row",
								justifyContent: "center", alignItems: "center", borderBottom: "2px solid black"
							}}>
								<LegendModalContainer>
									<div className="legend">
										<div className="legend-inner-view">
											<div className="serv legend-line-view">
												<div className="label-view">SERV{":"}</div>
												<div className="description-view">Cantidad de servicios,</div>
											</div>
											<div className="svl legend-line-view">
												<div className="label-view">SVL{":"}</div>
												<div className="description-view">Cantidad de Servicios de Vehículos Livianos,</div>
											</div>
											<div className="svp legend-line-view">
												<div className="label-view">SVP{":"}</div>
												<div className="description-view">Cantidad de Servicio de Vehículos Pesados,</div>
											</div>
											<div className="spv legend-line-view">
												<div className="label-view">SPV{":"}</div>
												<div className="description-view">Cantidad de Servicios Plan VIP,</div>
											</div>
											<div className="spb legend-line-view">
												<div className="label-view">SPB{":"}</div>
												<div className="description-view">Cantidad de Servicios Plan Básico,</div>
											</div>
											<div className="spm legend-line-view">
												<div className="label-view">SPM{":"}</div>
												<div className="description-view">Cantidad de Servicios Plan Minibus,</div>
											</div>
											<div className="sd legend-line-view">
												<div className="label-view">SD{":"}</div>
												<div className="description-view">Cantidad de Servicios Diurnos,</div>
											</div>
											<div className="sn legend-line-view">
												<div className="label-view">SND{":"}</div>
												<div className="description-view">Cantidad de Servicios Nocturnos,</div>
											</div>
											<div className="sf legend-line-view">
												<div className="label-view">SF{":"}</div>
												<div className="description-view">Cantidad de Servicios Fines de Semana y Feriados,</div>
											</div>
											<div className="sn legend-line-view">
												<div className="label-view">SNF{":"}</div>
												<div className="description-view">Cantidad de Servicios Nocturnos Fines de Semana y Feriados</div>
											</div>
										</div>
									</div>
								</LegendModalContainer>
							</div>
						</Fragment>
					)
					: null}
				<h4 style={{ textAlign: "center", marginTop: "20px", marginBottom: "-20px", color: "#0042a3" }}>Servicios por plan</h4>
				<GraphViewer padding={{ y: 0, x: 30 }} graphData={result.filter(value => ["SERV", "SPV", "SPB", "SPM"].includes(value.name))} />
				<div style={{
					width: "100%", height: "100%", paddingBottom: "30px", display: "flex", flexDirection: "row",
					justifyContent: "center", alignItems: "center", borderBottom: "2px solid black"
				}}>
					<LegendModalContainer>
						<div className="legend">
							<div className="legend-inner-view">
								<div className="serv legend-line-view">
									<div className="label-view">SERV{":"}</div>
									<div className="description-view">Cantidad de servicios,</div>
								</div>
								<div className="spv legend-line-view">
									<div className="label-view">SPV{":"}</div>
									<div className="description-view">Cantidad de Servicios Plan VIP,</div>
								</div>
								<div className="spb legend-line-view">
									<div className="label-view">SPB{":"}</div>
									<div className="description-view">Cantidad de Servicios Plan Básico,</div>
								</div>
								<div className="spm legend-line-view">
									<div className="label-view">SPM{":"}</div>
									<div className="description-view">Cantidad de Servicios Plan Minibus</div>
								</div>
							</div>
						</div>
					</LegendModalContainer>
				</div>

				<h4 style={{ textAlign: "center", marginTop: "40px", marginBottom: "-20px", color: "#0042a3" }}>Servicios por tipo de vehículo</h4>
				<GraphViewer padding={{ y: 0, x: 30 }} graphData={result.filter(value => ["SVL", "SVP"].includes(value.name))} />
				<div style={{
					width: "100%", height: "100%", paddingBottom: "30px", display: "flex", flexDirection: "row",
					justifyContent: "center", alignItems: "center", borderBottom: "2px solid black"
				}}>
					<LegendModalContainer>
						<div className="legend">
							<div className="legend-inner-view">
								<div className="svl legend-line-view">
									<div className="label-view">SVL{":"}</div>
									<div className="description-view">Cantidad de Servicios de Vehículos Livianos,</div>
								</div>
								<div className="svp legend-line-view">
									<div className="label-view">SVP{":"}</div>
									<div className="description-view">Cantidad de Servicio de Vehículos Pesados,</div>
								</div>
							</div>
						</div>
					</LegendModalContainer>
				</div>

				<h4 style={{ textAlign: "center", marginTop: "20px", marginBottom: "-20px", color: "#0042a3" }}>Servicios por tandas</h4>
				<GraphViewer padding={{ y: 0, x: 30 }} graphData={resultShifts} />
				<div style={{
					width: "100%", height: "100%", paddingBottom: "30px", display: "flex", flexDirection: "row",
					justifyContent: "center", alignItems: "center", borderBottom: "2px solid black"
				}}>
					<LegendModalContainer>
						<div className="legend">
							<div className="legend-inner-view">
								<div className="sd legend-line-view">
									<div className="label-view">SD{":"}</div>
									<div className="description-view">Cantidad de Servicios Diurnos,</div>
								</div>
								<div className="sn legend-line-view">
									<div className="label-view">SND{":"}</div>
									<div className="description-view">Cantidad de Servicios Nocturnos,</div>
								</div>
								<div className="sf legend-line-view">
									<div className="label-view">SF{":"}</div>
									<div className="description-view">Cantidad de Servicios Fines de Semana y Feriados,</div>
								</div>
								<div className="sn legend-line-view">
									<div className="label-view">SNF{":"}</div>
									<div className="description-view">Cantidad de Servicios Nocturnos Fines de Semana y Feriados</div>
								</div>
							</div>
						</div>
					</LegendModalContainer>
				</div>

				<h4 style={{ textAlign: "center", marginTop: "20px", marginBottom: "-20px", color: "#0042a3" }}>Servicios por región</h4>
				<GraphViewer padding={{ y: 0, x: 30 }} graphData={resultRegions} />
				<div style={{
					width: "100%", height: "100%", paddingBottom: "30px", display: "flex", flexDirection: "row",
					justifyContent: "center", alignItems: "center", borderBottom: "2px solid black"
				}}>
					<LegendModalContainer>
						<div className="legend">
							<div className="legend-inner-view">
								<div className="est legend-line-view">
									<div className="label-view">EST{":"}</div>
									<div className="description-view">Región Este,</div>
								</div>
								<div className="sur legend-line-view">
									<div className="label-view">SUR{":"}</div>
									<div className="description-view">Región Sur,</div>
								</div>
								<div className="cib legend-line-view">
									<div className="label-view">CIB{":"}</div>
									<div className="description-view">Región Cibao,</div>
								</div>
								<div className="sdo legend-line-view">
									<div className="label-view">SDO{":"}</div>
									<div className="description-view">Santo Domingo,</div>
								</div>
								<div className="mao legend-line-view">
									<div className="label-view">MAO{":"}</div>
									<div className="description-view">Mao,</div>
								</div>
								<div className="ppl legend-line-view">
									<div className="label-view">PPL{":"}</div>
									<div className="description-view">Puerto Plata,</div>
								</div>
								<div className="moc legend-line-view">
									<div className="label-view">MOC{":"}</div>
									<div className="description-view">Moca,</div>
								</div>
								<div className="ns legend-line-view">
									<div className="label-view">NS{":"}</div>
									<div className="description-view">Nagua - Samaná,</div>
								</div>
								<div className="sfs legend-line-view">
									<div className="label-view">SFS{":"}</div>
									<div className="description-view">San Francisco - Salcedo,</div>
								</div>
								<div className="as legend-line-view">
									<div className="label-view">AS{":"}</div>
									<div className="description-view">Asistencias</div>
								</div>
							</div>
						</div>
					</LegendModalContainer>
				</div>
			</div>
		</GraphReportsContainer>
	);
};

export default ViewReport;
