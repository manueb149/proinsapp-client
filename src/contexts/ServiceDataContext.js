import React, { createContext, useState } from 'react';

export const serviceDataContext = createContext();

const ServiceDataContext = ({ children }) => {

	const [trucks, setTrucks] = useState([]);
	const [truckAreas, setTruckAreas] = useState([]);
	const [severity, setSeverity] = useState("info");
	const [notification, setNotification] = useState("");
	const [dataTrucks, setDataTrucks] = useState([]);
	const [areaTruckSelect, SetAreaTruckSelect] = useState([]);

	const [search, setSearch] = useState({
		id: "",
		type: "poliza", //Default value: póliza
	});

    const [data, setData] = useState({
		poliza: "",
		cedula: "",
		asegurado: "",
		marca: "",
		modelo: "",
		anio: "",
		chassis: "",
		placa: "",
		tipoV: "",
		color: "",
		aseguradora: "",
		plan: "",
		ubicacion: "",
		destino: "",
		direccionGruero: "",
		telGruero: "",
		celGruero: "",
		contactoGruero: "",
		comentarioGruero: "",
		dia: "",
		tiempoGrua: "",
		tiempoCliente: "",
		distancia: "",
		precio: "",
	});

	const [servicesType, setServiceType] = useState({
		TranGrua: false,
		Extraccion: false,
		Cerrageria: false,
		CambioGomas: false,
		CorrienteEncendido: false,
		SuministrosGasolina: false,
		Peaje: false,
		ExtPeso: false,
		SubLoma: false,
	});

	const [detailSinister, setDetailSinister] = useState({
		Volcadura: false,
		Incedios: false,
		Colision: false,
		Danios: false,
	});

    return (
        <serviceDataContext.Provider
            value={{
				data: data,
				search: search, 
                servicesType: servicesType,
				detailSinister: detailSinister,
				trucks: trucks, 
				truckAreas: truckAreas, 
				dataTrucks: dataTrucks, 
				areaTruckSelect: areaTruckSelect, 
				severity: severity, 
				notification: notification,
				setData: setData,
				setSearch: setSearch,
                setServiceType: setServiceType,
				setDetailSinister: setDetailSinister,
				setTrucks: setTrucks,
				setTruckAreas: setTruckAreas,
				setDataTrucks: setDataTrucks,
				SetAreaTruckSelect: SetAreaTruckSelect,
				setSeverity: setSeverity,
				setNotification: setNotification,
            }}
        >
            {children}
        </serviceDataContext.Provider>
    )
}

export default ServiceDataContext;
