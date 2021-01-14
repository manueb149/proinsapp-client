import React, { Fragment, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "../../config/http-common";
import AuthContext from "../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";

const ConfirmDelete = ({
	message,
	setShowConfirm,
	showConfirm,
	setOpenSB,
	setSeverity,
	setNotification,
	selectedReport,
	setSelectedReport,
}) => {
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const { logout } = authContext;

	const handleDeleteService = async () => {
		await axios
			.delete(`service/delete/${selectedReport.serviceNo}`)
			.then((res) => {
				setOpenSB(false);
				setSeverity("success");
				console.log(res.data.message);
				setNotification(res.data.message);
				setOpenSB(true);
				setSelectedReport(null);
				setShowConfirm(false);
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
	};

	return (
		<Fragment>
			<Modal
				show={showConfirm}
				onHide={() => {
					setShowConfirm(false);
				}}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>{message.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{message.body}
					<p
						style={{
							marginBottom: "0px",
							fontWeight: "lighter",
							fontSize: "12px",
							fontStyle: "italic",
						}}
					>
						Nota: hacer doble click en Confirmar para aceptar
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							setShowConfirm(false);
						}}
					>
						Cerrar
					</Button>
					<Button
						variant="primary"
						onDoubleClick={() => {
							handleDeleteService();
						}}
					>
						Confirmar
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};

export default ConfirmDelete;
