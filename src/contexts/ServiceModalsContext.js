import React, { useState, createContext } from 'react';

export const serviceModalsContext=createContext();

const ServiceModalsContext = (props) => {

    const [servicesType, setServicesType] = useState({
		TG: "",
		EX: "",
		CR: "",
		CG: "",
		CE: "",
		SG: "",
		PE: "",
		SP: "",
		LM: ""
    });
    
    const [servicesTypeCk, setServicesTypeCk] = useState({
		TG: false,
		EX: false,
		CR: false,
		CG: false,
		CE: false,
		SG: false,
		PE: false,
		SP: false,
		LM: false
    });
    
    const [detailSinister, setDetailSinister] = useState({
		VO: "",
		IN: "",
		CO: "",
		DM: ""
	});

	const [detailSinisterCk, setDetailSinisterCk] = useState({
		VO: false,
		IN: false,
		CO: false,
		DM: false
	});

    return(
        <serviceModalsContext.Provider
            value={{
                servicesType: servicesType,
                detailSinister: detailSinister, 
                servicesTypeCk: servicesTypeCk,
                detailSinisterCk: detailSinisterCk,
                setDetailSinisterCk: setDetailSinisterCk,
                setServicesTypeCk: setServicesTypeCk,
                setDetailSinister: setDetailSinister, 
                setServicesType: setServicesType
            }}
        >
            {props.children}
        </serviceModalsContext.Provider>
    )
}

export default ServiceModalsContext;