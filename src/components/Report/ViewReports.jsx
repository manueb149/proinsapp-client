import React, { useState, useEffect, useContext } from "react";
import MUIDataTable from "mui-datatables";
import axios from "../../config/http-common";
import { ReportsContainer } from "../../layout/Reports/Reports.style";
import AuthContext from "../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";

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
		name: "cedula",
		label: "Cédula",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "marca",
		label: "Marca",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "modelo",
		label: "Modelo",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "anio",
		label: "Año",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "chassis",
		label: "Chassis",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "placa",
		label: "Placa",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "tipoVehiculo",
		label: "Vehículo",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "aseguradora",
		label: "Aseguradora",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "plan",
		label: "Plan",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "color",
		label: "Color",
		options: {
			filter: true,
			sort: true,
		},
	},
	{
		name: "registry",
		label: "Fecha",
		options: {
			filter: true,
			sort: true,
		},
	},
];

const options = {
	filter: true,
	rowsPerPage: 10,
	rowsPerPageOptions: [10, 100, 250, 500, 1000],
	filterType: "dropdown",
	responsive: "standard",
	fixedHeader: true,
	fixedSelectColumn: true,
	tableBodyHeight: "60vh",
};

const ViewReports = () => {
	// eslint-disable-next-line
	const [data, setData] = useState([]);
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const { logout } = authContext;

	useEffect(() => {
		const getReports = async () => {
			try {
				await axios
					.get(`/service`)
					.then((res) => {
						setData(res.data.results);
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

	return (
		<ReportsContainer>
			<MUIDataTable
				title={"Reportes registrados"}
				data={data}
				columns={columns}
				options={options}
			/>
		</ReportsContainer>
	);
};

export default ViewReports;
