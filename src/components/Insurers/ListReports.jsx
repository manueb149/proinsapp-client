import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { insurersContext } from "../../contexts/InsurersContext";
import { ReportsContainer } from "../../layout/Reports/Reports.style";
import moment from "moment-timezone";
import { Button } from "react-bootstrap";
import DatePicker from "../utils/DatePicker";
import axios from "../../config/http-common";
import filterReportsByDate from "../utils/filterReportsByDate";
import AuthContext from "../../contexts/auth/authContext";
import getServiceType from "../utils/getServiceType";
import MUIDataTable from "mui-datatables";
moment().tz("America/Santo_Domingo").format();

const columns = [
	{
		name: "asegurado",
		label: "Asegurado",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "poliza",
		label: "Póliza",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "aseguradora",
		label: "Aseguradora",
		options: {
			filter: false,
			sort: false,
		},
	},
	{
		name: "ubicacion",
		label: "Origen",
		options: {
			filter: false,
			sort: false,
		},
	},
	{
		name: "destino",
		label: "Destino",
		options: {
			filter: false,
			sort: false,
		},
	},
	{
		name: "servicios",
		label: "Servicios",
		options: {
			filter: true,
			sort: true,
		},
	},
];

const ListReports = () => {
	// eslint-disable-next-line
	const [data, setData] = useState([]);
	// eslint-disable-next-line
	const [selectedDateStart, handleDateChangeStart] = useState(new Date());
	const [selectedDateEnd, handleDateChangeEnd] = useState(new Date());
	const [filtering, setFiltering] = useState(false);
	const [cleaning, setCleaning] = useState(false);
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const { logout, user } = authContext;
	const InsurersContext = useContext(insurersContext);

	const {
		setFilteredInsurersReports,
		setFilteredInsurersDates,
	} = InsurersContext;

	const options = {
		filter: true,
		rowsPerPage: 100,
		rowsPerPageOptions: [10, 100, 250, 500, 1000],
		filterType: "dropdown",
		responsive: "standard",
		fixedHeader: true,
		fixedSelectColumn: false,
		tableBodyHeight: "55vh",
		selectableRows: "none",
		selectableRowsOnClick: false,
		selectableRowsHeader: false,
		selectToolbarPlacement: "none",
		textLabels: {
			body: {
				noMatch: "No se ha encontrado dicho reporte",
				toolTip: "Sort",
				columnHeaderTooltip: (column) => `Ordernar por ${column.label}`,
			},
			pagination: {
				next: "Página Siguiente",
				previous: "Página Anterior",
				rowsPerPage: "Filas por página:",
				displayRows: "de",
			},
			toolbar: {
				search: "Buscar",
				downloadCsv: "Descargar CSV",
				print: "Imprimir",
				viewColumns: "Ver Columnas",
				filterTable: "Tabla de Filtros",
			},
			filter: {
				all: "Todos",
				title: "FILTROS",
				reset: "RESETEAR",
			},
			viewColumns: {
				title: "Ver Columnas",
				titleAria: "Ver/Ocultar Tablas de Columnas",
			},
			selectedRows: {
				text: "fila(s) selecciona(s)",
				delete: "Eliminar",
				deleteAria: "Eliminar Fila",
			},
		},
		// onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
		// 	setSelectedReport(data[rowsSelected]);
		// },
	};

	useEffect(() => {
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
								)
							})
						);
						setData(
							newData.filter(
								(value) =>
									value.aseguradora ===
									String(user.name).toUpperCase()
							)
						);
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
		// setSelectedReport(null);
		setFilteredInsurersDates([]);
		setFilteredInsurersReports([]);
		// eslint-disable-next-line
	}, []);

	const handleFilter = () => {
		setFiltering(true);
		// setSelectedReport(null);
		const getReports = () => {
			try {
				axios
					.get(`/service`)
					.then((res) => {
						const newData = res.data.results.map(
							(value, index) => ({
								...value,
								servicios: getServiceType(
									value["tipoServicios"]
								)
							})
						);
						const filteredData = newData.filter(
							(value) =>
								value.aseguradora ===
								String(user.name).toUpperCase()
						);
						const data = filterReportsByDate(
							filteredData,
							selectedDateStart,
							selectedDateEnd
						);
						setData(data);
						setFilteredInsurersReports(data);
						setFilteredInsurersDates([
							selectedDateStart,
							selectedDateEnd,
						]);
						setFiltering(false);
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
								)
							})
						);
						setData(
							newData.filter(
								(value) =>
									value.aseguradora ===
									String(user.name).toUpperCase()
							)
						);
						setFilteredInsurersDates([]);
						setFilteredInsurersReports([]);
						setCleaning(false);
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

	return (
		<ReportsContainer>
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
						style={{ marginTop: "5px" }}
						onClick={handleFilter}
						disabled={filtering}
					>
						{filtering ? "Filtrando" : "Filtrar"}
					</Button>
					<Button
						variant="warning"
						style={{ marginTop: "5px", marginLeft: "5px" }}
						onClick={handleClear}
						disabled={cleaning}
					>
						{cleaning ? "Limpiando" : "Limpiar"}
					</Button>
				</div>
			</div>
			<MUIDataTable
				title={"Reportes registrados"}
				data={data}
				columns={columns}
				options={options}
			/>
		</ReportsContainer>
	);
};

export default ListReports;
