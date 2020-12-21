import React, { createContext, useState } from 'react';

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
	const [selectedDate, handleDateChange] = useState(new Date());

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
		user: ""
	});


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
				handleDateChange: handleDateChange

            }}
        >
            {children}
        </serviceDataContext.Provider>
    )
}

export default ServiceDataContext;
