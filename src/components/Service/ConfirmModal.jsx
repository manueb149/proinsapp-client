import React, { Fragment, useContext } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "../../config/http-common";
import AuthContext from "../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";

const ConfirmModal = ({ message, closeConfirm, showConfirm, setOpenSB, setSeverity, setNotification, payload, setData }) => {

    const history = useHistory();
    const authContext = useContext(AuthContext);
    const { logout } = authContext;

    payload.data.fechaSiniestro = payload.selectedDate;

    const handleCreateService = async () => {
		if (
			String(payload.data.asegurado).length === 0 ||
			String(payload.data.dia).length === 0 ||
			String(payload.data.ubicacion).length === 0 ||
			String(payload.data.destino).length === 0 ||
			Number(payload.data.tiempoGrua) === 0 ||
			Number(payload.data.distancia) === 0 ||
			Number(payload.data.precio) === 0 ||
			payload.areaTruckSelect.length === 0 ||
			payload.dataTrucks.length === 0
		) {
			setOpenSB(false);
			setSeverity("warning");
			setNotification("Faltan campos por completar!");
			setOpenSB(true);
			return;
		} else {
			await axios
				.post("/service/create", payload)
				.then((res) => {
					console.log(res);
					setOpenSB(false);
					setSeverity("success");
					setNotification("Servicio Registrado!");
                    setOpenSB(true);
                    closeConfirm();
                    setData({
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
                    })

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
	};

    return (
        <Fragment>
            <Modal
                show={showConfirm}
                onHide={closeConfirm}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{message.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeConfirm}>
                        Cerrar
            </Button>
                    <Button
                        variant="primary"
                        onClick={() => {handleCreateService()}}
                    >
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default ConfirmModal;