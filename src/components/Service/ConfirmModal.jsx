import React, { Fragment, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "../../config/http-common";
import AuthContext from "../../contexts/auth/authContext";
import { serviceModalsContext } from "../../contexts/ServiceModalsContext";
import { useHistory } from "react-router-dom";
// import PrintReport from "../Report/PrintReport";

const ConfirmModal = ({
	message,
	setShowConfirm,
	showConfirm,
	setOpenSB,
	setSeverity,
	setNotification,
	payload,
	setData,
}) => {
	// const [printService, setPrintService] = useState(null);
	// const [rendered, setRedered] = useState(false);
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const ServiceModalsContext = useContext(serviceModalsContext);
	const { logout, user } = authContext;

	const {
		setDetailSinisterCk,
		setServicesTypeCk,
		setDetailSinister,
		setServicesType,
	} = ServiceModalsContext;

	// const {
	// 	detailSinister,
	// 	detailSinisterCk,
	// 	servicesType,
	// 	servicesTypeCk,
	// } = payload;

	payload.data.user = user.name.toUpperCase();
	payload.data.fechaSiniestro = payload.selectedDate;

	// useLayoutEffect(() => {
	// 	setRedered(true);
	// }, []);

	const handleCreateService = async () => {
		if (
			String(payload.data.asegurado).length === 0 ||
			String(payload.data.dia).length === 0 ||
			String(payload.data.ubicacion).length === 0 ||
			String(payload.data.destino).length === 0 ||
			Number(payload.data.tiempoGrua) === 0 ||
			Number(payload.data.distancia) <= 0 ||
			Number(payload.data.precio) <= 0 ||
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
					setOpenSB(false);
					setSeverity("success");
					setNotification("Servicio Registrado!");
					setOpenSB(true);
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
					});
					setServicesType({
						EX: "",
						CR: "",
						CG: "",
						CE: "",
						SG: "",
						PE: "",
						LM: "",
					});
					setServicesTypeCk({
						TG: false,
						EX: false,
						CR: false,
						CG: false,
						CE: false,
						SG: false,
						PE: false,
						SP: false,
						LM: false,
					});
					setDetailSinister({
						VO: "",
						IN: "",
						CO: "",
						DM: "",
					});
					setDetailSinisterCk({
						VO: false,
						IN: false,
						CO: false,
						DM: false,
					});
					// setPrintService(res.data.newService);
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
					{/* <div className="download-link">
						{printService && rendered ? (
							<PrintReport
								printData={printService}
							/>
						) : null}
					</div> */}
				</Modal.Body>
				<Modal.Footer>
					{/* {printService ? (
						<Button
							variant="secondary"
							onClick={() => {
								setRedered(true);
							}}
						>
							Imprimir
						</Button>
					) : null} */}
					<Button
						variant="secondary"
						onClick={() => {
                            // setRedered(false);
							// setPrintService(null);
							setShowConfirm(false);
						}}
					>
						Cerrar
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							handleCreateService();
						}}
					>
						Confirmar
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};

export default ConfirmModal;
