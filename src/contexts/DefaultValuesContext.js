import React, { useState, createContext, useEffect } from 'react';
import axios from "../http-common";

export const defaultValuesContext = createContext();

const DefaultValuesContext = (props) => {

    const [values, setValues] = useState({
        TG: "",
        CR: "",
        EX: "",
        SP: "",
        LM: "",
        PE: "",
        SG: "",
        CE: "",
        CG: "",
        VO: "",
        IN: "",
        CO: "",
        DM: "",
        TN: "",
        FF: "",
    });

    useEffect(() => {
        const getValues = async () => {
            await axios.get('values')
                .then((res) => {
                    setValues(res.data.values)
                })
                .catch()
        }
		getValues();
		// eslint-disable-next-line
	}, []);

    return (
        <defaultValuesContext.Provider
            value={{
                values,
                setValues
            }}
        >
            {props.children}
        </defaultValuesContext.Provider>
    );
}

export default DefaultValuesContext;