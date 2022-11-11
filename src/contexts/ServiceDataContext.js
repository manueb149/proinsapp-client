import React, { createContext, useState, useEffect } from 'react';
import axios from '../config/http-common';

export const serviceDataContext = createContext();

const ServiceDataContext = ({ children }) => {

	const [trucks, setTrucks] = useState([]);
	const [truckAreas, setTruckAreas] = useState([]);
	const [severity, setSeverity] = useState("info");
	const [notification, setNotification] = useState("");
	const [dataTrucks, setDataTrucks] = useState([]);
	const [areaTruckSelect, SetAreaTruckSelect] = useState([]);
	const [multipleCars, setMultipleCars] = useState([]);
	const [multipleCarsSelect, setMultipleCarsSelect] = useState([]);
	const [isServiceNotRegistered, setIsServiceNotRegistered] = useState(false);
	const [selectedDate, handleDateChange] = useState(new Date());
	const [selectedBakDate, handleBakDateChange] = useState(new Date());

	const [search, setSearch] = useState({
		id: "",
		type: "poliza", //Default value: póliza
	});

	const [data, setData] = useState({
		poliza: "",
		cedula: "",
		asegurado: "",
		telAseg1: "",
		telAseg2: "",
		marca: "",
		modelo: "",
		anio: "",
		chassis: "",
		placa: "",
		tipoV: "",
		color: "",
		aseguradora: "",
		plan: "",
		infoSin: "",
		estadoV: "",
		ubicacion: "",
		destino: "",
		direccionGruero: "",
		telGruero: "",
		celGruero: "",
		contactoGruero: "",
		comentarioGruero: "",
		dia: "",
		noche: false,
		tiempoGrua: "",
		tiempoCliente: "",
		distancia: "",
		precio: "",
		tarifaEspecial: "",
		user: "",
		snr: false,
	});

	useEffect(() => {
		const getTrucksAreas = async () => {
			await axios
				.get("/trucksData/areas")
				.then((res) => setTruckAreas(res.data.areas))
				.catch((error) => {
					if (error.response) {
						// Request made and server responded
						if (error.response.data.text === "TNV") {
							// logout();
							// history.push("/");
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
		};
		getTrucksAreas();
		// eslint-disable-next-line
	}, []);


	return (
		<serviceDataContext.Provider
			value={{
				data: data,
				search: search,
				trucks: trucks,
				truckAreas: truckAreas,
				dataTrucks: dataTrucks,
				areaTruckSelect: areaTruckSelect,
				severity: severity,
				notification: notification,
				multipleCars: multipleCars,
				multipleCarsSelect: multipleCarsSelect,
				selectedDate: selectedDate,
				selectedBakDate: selectedBakDate,
				isServiceNotRegistered: isServiceNotRegistered,
				setData: setData,
				setSearch: setSearch,
				setTrucks: setTrucks,
				setTruckAreas: setTruckAreas,
				setDataTrucks: setDataTrucks,
				SetAreaTruckSelect: SetAreaTruckSelect,
				setSeverity: setSeverity,
				setNotification: setNotification,
				setMultipleCars: setMultipleCars,
				setMultipleCarsSelect: setMultipleCarsSelect,
				setIsServiceNotRegistered: setIsServiceNotRegistered,
				handleDateChange: handleDateChange,
				handleBakDateChange: handleBakDateChange
			}}
		>
			{children}
		</serviceDataContext.Provider>
	)
}

export default ServiceDataContext;
