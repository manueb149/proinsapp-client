import React, { useState, useEffect, useContext } from "react";
import { serviceDataContext } from "../../contexts/ServiceDataContext";
import { StartContainer } from "../../layout/Dashboard/Start.style";
import LinearProgress from '../utils/linearProgress';
import CollapsibleTable from "../utils/collapsibleTable";
// import { Button } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axios from "../../config/http-common";
import SnackBar from "../utils/SnackBar";
import AuthContext from "../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";

const Start = () => {
    const actualYear = Number((new Date()).getFullYear());
    const [openSB, setOpenSB] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clear, setClear] = useState(false);
    const [repeatedServices, setRepeatedServices] = useState([])
    const [search, setSearch] = useState({
        id: "",
        type: "poliza", //Default value: póliza
    });
    const history = useHistory();

    const ServiceDataContext = useContext(serviceDataContext);
    const authContext = useContext(AuthContext);

    const { logout, user } = authContext;
    const permitedUsers = [
        "MANUEL BENCOSME",
        "KOHURIS HENRÍQUEZ",
        "ISABEL HERNÁNDEZ"
    ]

    const {
        severity,
        notification,
        setSeverity,
        setNotification,
    } = ServiceDataContext;

    useEffect(() => {
        const getServices = async () => {
            setLoading(true)
            await axios
                .get(`/service`)
                .then((res) => {
                    if (res.data.results.length < 1) {
                        setOpenSB(false);
                        setSeverity("warning");
                        setNotification(`No se han encontrado servicios, intente refrescar la página.`);
                        setOpenSB(true);
                        return
                    }
                    const data = res.data.results;

                    const newData = [];
                    const storedChassis = []
                    data.forEach(service => {
                        const repeated = data.filter(value => (value.chassis === service.chassis) && (value.registry.search(`${actualYear}`) !== -1))
                        if (repeated.length >= 2 && !storedChassis.includes(service.chassis)) {
                            newData.push({
                                ...service,
                                history: repeated,
                                assistances: repeated.length
                            })
                            storedChassis.push(service.chassis)
                        }
                    })
                    if (newData?.length) {
                        newData.sort((a, b) => b.assistances - a.assistances)
                    }
                    setRepeatedServices(newData)
                    setLoading(false);

                })
                .catch((error) => {
                    if (error.response) {
                        // Request made and server responded
                        if (error.response.data.text === "TNV") {
                            logout();
                            history.push("/");
                        } else {
                            setOpenSB(false);
                            setSeverity("error");
                            setNotification(error.response.data.message);
                            setOpenSB(true);
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
        if (user) if (permitedUsers.includes(user.name.toUpperCase())) getServices();
        // eslint-disable-next-line
    }, []);

    const handleCloseSB = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSB(false);
    };

    // const handleSearch = async () => {
    //     if (search.id.trim() === "" || search.type.trim() === "") {
    //         return;
    //     } else if (search.id.trim().toUpperCase() === "TRAMITE") {
    //         return;
    //     } else {
    //         await axios
    //             .get(`/service/report/${search.type}/${search.id}`)
    //             .then((res) => {
    //                 if (res.data.length < 1) {
    //                     setOpenSB(false);
    //                     setSeverity("warning");
    //                     setNotification(`No se han encontrado servicios para ${search.type}: ${search.id}`);
    //                     setOpenSB(true);
    //                     return
    //                 }
    //                 const newData = []
    //                 newData.push({
    //                     ...res.data[0],
    //                     history: res.data,
    //                     assistances: res.data.length
    //                 })
    //                 if (newData?.length) {
    //                     newData.sort((a, b) => b.assistances - a.assistances)
    //                 }
    //                 setRepeatedServices(newData)
    //             })
    //             .catch((error) => {
    //                 if (error.response) {
    //                     // Request made and server responded
    //                     if (error.response.data.text === "TNV") {
    //                         logout();
    //                         history.push("/");
    //                     } else {
    //                         setOpenSB(false);
    //                         setSeverity("error");
    //                         setNotification(error.response.data.message);
    //                         setOpenSB(true);
    //                     }
    //                 } else if (error.request) {
    //                     // The request was made but no response was received
    //                     console.log(error.request);
    //                 } else {
    //                     // Something happened in setting up the request that triggered an Error
    //                     console.log("Error", error.message);
    //                 }
    //             });
    //     }
    // };

    // const handleClear = () => {
    //     setSearch({ ...search, id: "" })
    //     setClear(!clear)
    // }

    return (
        <StartContainer>
            <SnackBar
                severity={severity}
                notification={notification}
                openSB={openSB}
                handleOpenSB={() => setOpenSB(true)}
                handleCloseSB={handleCloseSB}
            />

            {loading ? <LinearProgress /> : null}
            {/* <div className="card c-search mb-2">
                <div className="card-header">Búsqueda General</div>
                <div className="card-body">
                    <form
                        className="form-row"
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSearch()
                        }}
                    >
                        <div className="col-lg-3 mb-1"></div>
                        <div className="col-lg-3 mb-1">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                id="SearchBox"
                                value={search.id || ""}
                                onChange={(e) =>
                                    setSearch({ ...search, id: e.target.value })
                                }
                                required
                            ></input>
                        </div>
                        <div className="col-lg-3 mb-1">
                            <select
                                className="form-control form-control-sm"
                                id="SearchChoise"
                                onChange={(e) =>
                                    setSearch({
                                        ...search,
                                        type: e.target.value,
                                    })
                                }
                                required
                            >
                                <option value={"poliza"} defaultValue>
                                    Póliza
                                </option>
                                <option value={"codigo"}>Código</option>
                                <option value={"cedula"}>Cédula</option>
                                <option value={"placa"}>Placa</option>
                                <option value={"chassis"}>Chassis</option>
                            </select>
                        </div>
                        <div className="col-lg-3 mb-1">
                            <Button
                                className="mr-1"
                                variant="primary"
                                size="sm"
                                onClick={() => handleSearch()}
                            >
                                Buscar
                            </Button>
                            <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleClear()}
                            >
                                Limpiar
                            </Button>
                        </div>
                    </form>
                </div>
            </div> */}
            {repeatedServices && user ? <CollapsibleTable rows={repeatedServices} user={user} permitedUsers={permitedUsers} /> : null}
        </StartContainer>
    );
};

export default Start;
