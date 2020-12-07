import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "../../http-common";
import { ReportsContainer } from "../../layout/Reports/Reports.style";

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

	useEffect(() => {
		const getReports = async () => {
			await axios
				.get(`/service`)
				.then((res) => {
					setData(res.data.results);
				})
				.catch((err) => setData(console.log(err)));
		};
		getReports();
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
