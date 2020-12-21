import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from "../config/http-common";
import AuthContext from "../contexts/auth/authContext";
import { useHistory } from "react-router-dom";


export const defaultValuesContext = createContext();

const DefaultValuesContext = (props) => {

    const history = useHistory();
    const authContext = useContext(AuthContext);
    const { logout } = authContext;

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