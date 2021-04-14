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
	const { severity, setSeverity, notification, setNotification, } = ServiceDataContext;
	const authContext = useContext(AuthContext);
	const { logout, user } = authContext;
	const InsurersContext = useContext(insurersContext);
	const {
		graphData,
		dataGraph,
		result,
		setResult,
		setDataGraph,
	} = InsurersContext;

	useEffect(() => {
		const getReports = async () => {
			try {
				await axios
					.get(`/service`)
					.then((res) => {
						const newData = res.data.results.map(
							(value, index) => ({
								...value,
								servicios: getServiceType(value["tipoServicios"]),
							})
						);
						// const filteredData = newData.filter((value) => value.aseguradora === String(user.name).toUpperCase());
						const filteredData = newData.filter((value) => value.aseguradora === String("la internacional").toUpperCase());
						setDataGraph(filteredData);

						const SERV = dataGraph.length === 0 ? filteredData.length : dataGraph.length

						const SVL = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.tipoVehiculo === "AUTOMOVIL" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.tipoVehiculo === "AUTOMOVIL" ? ++acc : acc), 0)

						const SVP = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.tipoVehiculo !== "AUTOMOVIL" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.tipoVehiculo !== "AUTOMOVIL" ? ++acc : acc), 0)

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

						const SN = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.noche ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.noche ? ++acc : acc), 0)

						const SF = dataGraph.length === 0
							? filteredData.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)

						const graphDataUpd = graphData.map((value, index) => {
							if (value.x === 1) { return { ...value, y: SERV } }
							else if (value.x === 2) { return { ...value, y: SVL } }
							else if (value.x === 3) { return { ...value, y: SVP } }
							else if (value.x === 4) { return { ...value, y: SPV } }
							else if (value.x === 5) { return { ...value, y: SPB } }
							else if (value.x === 6) { return { ...value, y: SPM } }
							else if (value.x === 7) { return { ...value, y: Number((KMR / 1000).toFixed(3)), label: Number((KMR / 1000).toFixed(3)) + 'k' } }
							else if (value.x === 8) { return { ...value, y: SD } }
							else if (value.x === 9) { return { ...value, y: SN } }
							else if (value.x === 10) { return { ...value, y: SF } }
							else { return { ...value } }
						});
						setResult(graphDataUpd);

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
							? filteredDataDate.reduce((acc, cur) => (cur.tipoVehiculo === "AUTOMOVIL" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.tipoVehiculo === "AUTOMOVIL" ? ++acc : acc), 0)

						const SVP = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.tipoVehiculo !== "AUTOMOVIL" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.tipoVehiculo !== "AUTOMOVIL" ? ++acc : acc), 0)

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

						const SN = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.noche ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.noche ? ++acc : acc), 0)

						const SF = filteredDataDate.length !== 0
							? filteredDataDate.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)
							: dataGraph.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)

						const graphDataUpd = graphData.map((value, index) => {
							if (value.x === 1) { return { ...value, y: SERV } }
							else if (value.x === 2) { return { ...value, y: SVL } }
							else if (value.x === 3) { return { ...value, y: SVP } }
							else if (value.x === 4) { return { ...value, y: SPV } }
							else if (value.x === 5) { return { ...value, y: SPB } }
							else if (value.x === 6) { return { ...value, y: SPM } }
							else if (value.x === 7) { return { ...value, y: Number((KMR / 1000).toFixed(3)), label: Number((KMR / 1000).toFixed(3)) + 'k' } }
							else if (value.x === 8) { return { ...value, y: SD } }
							else if (value.x === 9) { return { ...value, y: SN } }
							else if (value.x === 10) { return { ...value, y: SF } }
							else { return { ...value } }
						});
						setResult(graphDataUpd);

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
						const SVL = filteredData.reduce((acc, cur) => (cur.tipoVehiculo === "AUTOMOVIL" ? ++acc : acc), 0)
						const SVP = filteredData.reduce((acc, cur) => (cur.tipoVehiculo !== "AUTOMOVIL" ? ++acc : acc), 0)
						const SPV = filteredData.reduce((acc, cur) => (cur.plan === "PLAN VIP" ? ++acc : acc), 0)
						const SPB = filteredData.reduce((acc, cur) => (cur.plan === "PLAN BASICO" ? ++acc : acc), 0)
						const SPM = filteredData.reduce((acc, cur) => (cur.plan === "PLAN MINIBUS" ? ++acc : acc), 0)
						const KMR = filteredData.reduce((acc, cur) => (cur.distancia >= 0 ? acc += cur.distancia : acc), 0)
						const SD = filteredData.reduce((acc, cur) => (cur.dia === "DN" ? ++acc : acc), 0)
						const SN = filteredData.reduce((acc, cur) => (cur.noche ? ++acc : acc), 0)
						const SF = filteredData.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0)

						const graphDataUpd = graphData.map((value, index) => {
							if (value.x === 1) { return { ...value, y: SERV } }
							else if (value.x === 2) { return { ...value, y: SVL } }
							else if (value.x === 3) { return { ...value, y: SVP } }
							else if (value.x === 4) { return { ...value, y: SPV } }
							else if (value.x === 5) { return { ...value, y: SPB } }
							else if (value.x === 6) { return { ...value, y: SPM } }
							else if (value.x === 7) { return { ...value, y: Number((KMR / 1000).toFixed(3)), label: Number((KMR / 1000).toFixed(3)) + 'k' } }
							else if (value.x === 8) { return { ...value, y: SD } }
							else if (value.x === 9) { return { ...value, y: SN } }
							else if (value.x === 10) { return { ...value, y: SF } }
							else { return { ...value } }
						});
						setResult(graphDataUpd);
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
		const SVL = dataGraph.reduce((acc, cur) => (cur.tipoVehiculo === "AUTOMOVIL" ? ++acc : acc), 0);
		const SVP = dataGraph.reduce((acc, cur) => (cur.tipoVehiculo !== "AUTOMOVIL" ? ++acc : acc), 0);
		const SPV = dataGraph.reduce((acc, cur) => (cur.plan === "PLAN VIP" ? ++acc : acc), 0);
		const SPB = dataGraph.reduce((acc, cur) => (cur.plan === "PLAN BASICO" ? ++acc : acc), 0);
		const SPM = dataGraph.reduce((acc, cur) => (cur.plan === "PLAN MINIBUS" ? ++acc : acc), 0);
		const KMR = dataGraph.reduce((acc, cur) => (cur.distancia >= 0 ? acc += cur.distancia : acc), 0);
		const SD = dataGraph.reduce((acc, cur) => (cur.dia === "DN" ? ++acc : acc), 0);
		const SN = dataGraph.reduce((acc, cur) => (cur.noche ? ++acc : acc), 0);
		const SF = dataGraph.reduce((acc, cur) => (cur.dia === "DF" ? ++acc : acc), 0);

		const graphDataUpd = graphData.map((value, index) => {
			if (value.x === 1) { return { ...value, y: SERV } }
			else if (value.x === 2) { return { ...value, y: SVL } }
			else if (value.x === 3) { return { ...value, y: SVP } }
			else if (value.x === 4) { return { ...value, y: SPV } }
			else if (value.x === 5) { return { ...value, y: SPB } }
			else if (value.x === 6) { return { ...value, y: SPM } }
			else if (value.x === 7) { return { ...value, y: Number((KMR / 1000).toFixed(3)), label: Number((KMR / 1000).toFixed(3)) + 'k' } }
			else if (value.x === 8) { return { ...value, y: SD } }
			else if (value.x === 9) { return { ...value, y: SN } }
			else if (value.x === 10) { return { ...value, y: SF } }
			else { return { ...value } }
		});
		setResult(graphDataUpd);
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

			{getUserPrivileges(user.name)[0] === 'main'
				? (
					<Fragment>
						<h4 style={{ textAlign: "center", marginTop: "40px", marginBottom: "-30px", color: "#0042a3" }}>Gráfico General</h4>
						<GraphViewer padding={{ y: 0, x: 20 }} graphData={result} />
					</Fragment>
				)
				: null}
			<h4 style={{ textAlign: "center", marginTop: "20px", marginBottom: "-20px", color: "#0042a3" }}>Servicios por plan</h4>
			<GraphViewer padding={{ y: 0, x: 30 }} graphData={result.filter(value => ["SERV", "SPV", "SPB", "SPM"].includes(value.name))} />

			<h4 style={{ textAlign: "center", marginTop: "20px", marginBottom: "-20px", color: "#0042a3" }}>Servicios por tipo de vehículo</h4>
			<GraphViewer padding={{ y: 0, x: 30 }} graphData={result.filter(value => ["SVL", "SVP"].includes(value.name))} />

			<h4 style={{ textAlign: "center", marginTop: "20px", marginBottom: "-20px", color: "#0042a3" }}>Servicios por tandas</h4>
			<GraphViewer padding={{ y: 0, x: 30 }} graphData={result.filter(value => ["SN", "SD", "SF"].includes(value.name))} />
		</GraphReportsContainer>
	);
};

export default ViewReport;
