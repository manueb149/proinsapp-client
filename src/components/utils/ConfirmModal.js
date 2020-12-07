import React, { Fragment } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "../../http-common";

const ConfirmModal = ({ message, closeConfirm, showConfirm, setOpenSB, setSeverity, setNotification, payload }) => {

    const handleCreateService = async () => {
		if (
			String(payload.data.asegurado).length === 0 ||
			String(payload.data.dia).length === 0 ||
			String(payload.data.ubicacion).length === 0 ||
			String(payload.data.destino).length === 0 ||
			Number(payload.data.tiempoGrua) === 0 ||
			Number(payload.data.tiempoCliente) === 0 ||
			Number(payload.data.distancia) === 0 ||
			Number(payload.data.precio) === 0 ||
			payload.singleSelection.length === 0 ||
			payload.multiSelections.length === 0
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
				})
				.catch((err) => console.log(err));
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