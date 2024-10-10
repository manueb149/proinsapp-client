import React, { useState, useEffect, useContext } from "react";
import { defaultValuesContext } from "../../contexts/DefaultValuesContext";
import { CreateServiceContainer } from "../../layout/Service/Service.style";
import { reportContext } from "../../contexts/ReportContext";
import { Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-phone-number-input/style.css";
import MapModal from "../Service/MapModal";
import DetailsModal from "../Service/DetailsModal";
import TypesModal from "../Service/TypesModal";
import ConfirmEdit from "./ConfirmEdit";
import axios from "../../config/http-common";
import { Form } from "react-bootstrap";
import SnackBar from "../utils/SnackBar";
import DateTimePicker from "../utils/DateTimePicker";
import PhoneInput from "react-phone-number-input";
import AuthContext from "../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";
// import serviceCalc from "../utils/serviceCalc";
import summaryCalcProinsa from "../utils/serviceCalculation/proinsa";
import plusIcon from '../../assets/svg/plus-icon.svg';
import iqualsIcon from '../../assets/svg/iquals-icon.svg';

const EditReport = () => {
	const [severity, setSeverity] = useState("info");
	const [notification, setNotification] = useState("");
	const [showType, setShowType] = useState(false);
	const [showDetail, setShowDetail] = useState(false);
	const [showMap, setShowMap] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [openSB, setOpenSB] = useState(false);
	const history = useHistory();

	const DefaultValuesContext = useContext(defaultValuesContext);
	const authContext = useContext(AuthContext);
	const ReportContext = useContext(reportContext);

	const { logout } = authContext;
	const { values, setValues } = DefaultValuesContext;
	const { selectedReport, setSelectedReport } = ReportContext;

	const [servicesType, setServicesType] = useState(
		selectedReport
			? selectedReport.tipoServicios.servicesType
			: {
				TG: "",
				EX: "",
				CR: "",
				CG: "",
				CE: "",
				SG: "",
				PE: "",
				SP: "",
				LM: "",
			}
	);

	const [servicesTypeCk, setServicesTypeCk] = useState(
		selectedReport
			? selectedReport.tipoServicios.servicesTypeCk
			: {
				TG: false,
				EX: false,
				CR: false,
				CG: false,
				CE: false,
				SG: false,
				PE: false,
				SP: false,
				LM: false,
			}
	);

	const [detailSinister, setDetailSinister] = useState(
		selectedReport
			? selectedReport.detalleSiniestro.detailSinister
			: {
				VO: "",
				IN: "",
				CO: "",
				DM: "",
			}
	);

	const [detailSinisterCk, setDetailSinisterCk] = useState(
		selectedReport
			? selectedReport.detalleSiniestro.detailSinisterCk
			: {
				VO: false,
				IN: false,
				CO: false,
				DM: false,
			}
	);

	const [trucks, setTrucks] = useState([]);
	const [truckAreas, setTruckAreas] = useState([]);
	const [dataTrucks, setDataTrucks] = useState(
		selectedReport ? [selectedReport.datosGruero] : []
	);
	const [areaTruckSelect, SetAreaTruckSelect] = useState(
		selectedReport ? [selectedReport.datosGruero.region] : []
	);
	const [selectedDate, handleDateChange] = useState(new Date());

	const [data, setData] = useState(
		selectedReport
			? {
				...selectedReport,
				direccionGruero: selectedReport.datosGruero.direccion || "",
				telGruero: selectedReport.datosGruero.telOficina || "",
				celGruero: selectedReport.datosGruero.telCelular || "",
				contactoGruero: selectedReport.datosGruero.contacto || "",
			}
			: {
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
				tarifaEspecial: "",
				user: "",
			}
	);

	const isServiceVIP = String(data?.plan).toLowerCase().includes('vip');
	const { precio: pagoProinsa, precioCliente, precioTotal } = summaryCalcProinsa(
		data,
		values,
		servicesType,
		servicesTypeCk,
		detailSinister,
		detailSinisterCk,
		dataTrucks,
		isServiceVIP
	);

	useEffect(() => {
		const getTrucksAreas = async () => {
			await axios
				.get("/trucksData/areas")
				.then((res) => setTruckAreas(res.data.areas))
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
		const getValues = async () => {
			await axios
				.get("values")
				.then((res) => {
					setValues(res.data.values);
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
		getValues();
		getTrucksAreas();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const getTrucks = async () => {
			await axios
				.post("/trucksData", { region: areaTruckSelect[0] || "" })
				.then((res) => setTrucks(res.data))
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
		getTrucks();
		// eslint-disable-next-line
	}, [areaTruckSelect]);

	useEffect(() => {
		const setGrueroData = () => {
			setData({
				...data,
				direccionGruero: dataTrucks[0].direccion || "",
				telGruero: dataTrucks[0].telOficina || "",
				celGruero: dataTrucks[0].telCelular || "",
				contactoGruero: dataTrucks[0].contacto || "",
				datosGruero: dataTrucks[0],
			});
			setServicesType({
				...servicesType,
				TG:
					dataTrucks.length === 0
						? values.TG
						: dataTrucks[0].trasporteGrua,
			});
		};
		if (dataTrucks[0]) {
			setGrueroData();
		} else {
			setData({
				...data,
				direccionGruero: "",
				telGruero: "",
				celGruero: "",
				contactoGruero: "",
			});
		}
		// eslint-disable-next-line
	}, [dataTrucks]);

	useEffect(() => {
		setData({
			...data,
			detalleSiniestro: { detailSinister, detailSinisterCk },
			tipoServicios: { servicesType, servicesTypeCk },
		});
		// eslint-disable-next-line
	}, [servicesType, servicesTypeCk, detailSinister, detailSinisterCk]);

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeTF = (e) => {
		setData({
			...data,
			[e.target.name]:
				Number(e.target.value) < 0
					? Number("0.00").toFixed(2)
					: Number(e.target.value).toFixed(2),
		});
	};

	const handleServiceTypeCk = (e) => {
		setServicesType({
			...servicesType,
			[e.target.id]: !servicesType[e.target.id],
		});
	};

	const handleDetailCk = (e) => {
		setDetailSinister({
			...detailSinister,
			[e.target.id]: !detailSinister[e.target.id],
		});
	};

	const handleCloseSB = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSB(false);
	};

	const handlePhone1 = (event) => {
		if (event !== undefined) {
			if (event.length <= 12) {
				setData({
					...data,
					telAseg1: event ? event : "",
				});
			}
		}
	};

	const handlePhone2 = (event) => {
		if (event !== undefined) {
			if (event.length <= 12) {
				setData({
					...data,
					telAseg2: event ? event : "",
				});
			}
		}
	};

	console.log({ ...data });

	return (
		<CreateServiceContainer>
			<ConfirmEdit
				message={{
					title: `Editar Servicio #${selectedReport ? selectedReport.serviceNo : ""}`,
					body: "¿Está seguro que desea actulizar este servicio?",
				}}
				showConfirm={showConfirm}
				setShowConfirm={setShowConfirm}
				setOpenSB={setOpenSB}
				setSeverity={setSeverity}
				setNotification={setNotification}
				payload={{
					data,
					selectedDate,
					areaTruckSelect,
					dataTrucks
				}}
				setSelectedReport={setSelectedReport}
			/>

			<SnackBar
				severity={severity}
				notification={notification}
				openSB={openSB}
				handleOpenSB={() => setOpenSB(true)}
				handleCloseSB={handleCloseSB}
			/>

			{values ? (
				<TypesModal
					valuesContext={values}
					values={servicesType}
					setValues={setServicesType}
					checked={servicesTypeCk}
					setChecked={setServicesTypeCk}
					showType={showType}
					setShowType={setShowType}
					servicesType={servicesType}
					handleServiceTypeCk={handleServiceTypeCk}
					data={data}
					setData={setData}
					dataTrucks={dataTrucks}
				/>
			) : null}

			{values ? (
				<DetailsModal
					valuesContext={values}
					values={detailSinister}
					setValues={setDetailSinister}
					checked={detailSinisterCk}
					setChecked={setDetailSinisterCk}
					showDetail={showDetail}
					setShowDetail={setShowDetail}
					detailSinister={detailSinister}
					handleDetailCk={handleDetailCk}
				/>
			) : null}

			<MapModal showMap={showMap} setShowMap={setShowMap} />

			<Button
				variant="primary"
				size="sm"
				onClick={() => setShowType(true)}
			>
				Tipos de servicios
			</Button>
			<Button
				variant="primary"
				size="sm"
				onClick={() => setShowDetail(true)}
			>
				Detalles siniestro
			</Button>
			<Button
				variant="primary"
				size="sm"
				// onClick={() => setShowMap(true)}
				onClick={() => {
					window.open("https://www.google.com/maps/", "_blank");
				}}
			>
				Mostrar Mapa
			</Button>
			<Button
				variant="success"
				size="sm"
				onClick={() => {
					setShowConfirm(true);
				}}
			>
				Actualizar
			</Button>

			<div className="card c-vehicle mb-2">
				<div className="card-header">Datos del Vehiculo</div>
				<div className="card-body">
					<div className="form-row">
						<div className="col-lg-3 mb-3">
							<label htmlFor="no-poliza">No. Póliza</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="no-poliza"
								value={data.poliza || ""}
								disabled
							></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="chassis">Chassis</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="chassis"
								value={data.chassis || ""}
								disabled
							></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="tipo">Tipo</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="tipo"
								value={data.tipoVehiculo || ""}
								disabled
							></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="marca">Marca</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="marca"
								value={data.marca || ""}
								disabled
							></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="modelo">Modelo</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="modelo"
								value={data.modelo || ""}
								disabled
							></input>
						</div>
					</div>
					<div className="form-row">
						<div className="col-lg-2 mb-3">
							<label htmlFor="color">Color</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="color"
								// name="color"
								onChange={(e) =>
									setData({
										...data,
										color: e.target.value.toUpperCase(),
									})
								}
								value={data.color}
							// disabled
							></input>
						</div>
						<div className="col-lg-1 mb-3">
							<label htmlFor="anio">Año</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="anio"
								value={data.anio || ""}
								disabled
							></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="placa2">Placa</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="placa2"
								value={data.placa || ""}
								disabled
							></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="aseg">Aseguradora</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="aseg"
								value={data.aseguradora || ""}
								disabled
							></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="plan">Plan</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="plan"
								value={data.plan || ""}
								disabled
							></input>
						</div>
					</div>
				</div>
			</div>
			<div className="card c-tenant mb-2">
				<div className="card-header">Datos del Asegurado</div>
				<div className="card-body">
					<div className="form-row">
						<div className="col-lg-6 mb-3">
							<label htmlFor="nombre">Nombre</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="nombre"
								value={data.asegurado || ""}
								required
								disabled
							></input>
						</div>
					</div>
					<div className="form-row">
						<div className="col-lg-4 mb-3">
							<label htmlFor="telAseg1">Teléfono 1</label>
							<PhoneInput
								className="form-control form-control-sm"
								name="telAseg1"
								international
								countryCallingCodeEditable={false}
								defaultCountry="DO"
								value={data.telAseg1}
								onChange={handlePhone1}
							/>
						</div>
						<div className="col-lg-4 mb-3">
							<label htmlFor="telAseg2">Teléfono 2</label>
							<PhoneInput
								className="form-control form-control-sm"
								name="telAseg2"
								international
								countryCallingCodeEditable={false}
								defaultCountry="DO"
								value={data.telAseg2}
								onChange={handlePhone2}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="card c-sinister mb-2">
				<div className="card-header">Datos del Siniestro</div>
				<div className="card-body">
					<div className="form-row">
						<div className="col-lg-12 mb-3">
							<label htmlFor="infoSin">
								Información del siniestro
							</label>
							<input
								placeholder="¿Qué siniestro ocurrió?"
								type="text"
								className="form-control form-control-sm"
								id="infoSin"
								onChange={(e) => {
									setData({
										...data,
										infoSin: e.target.value.toUpperCase(),
									});
								}}
								value={data.infoSin}
								required
							></input>
						</div>
						<div className="col-lg-12 mb-3">
							<label htmlFor="estadoV">Estado del vehículo</label>
							<input
								placeholder="¿En qué condición se encuentra el vehículo?"
								type="text"
								className="form-control form-control-sm"
								id="estadoV"
								onChange={(e) => {
									setData({
										...data,
										estadoV: e.target.value.toUpperCase(),
									});
								}}
								value={data.estadoV}
								required
							></input>
						</div>
						<div className="col-lg-12 mb-3">
							<label htmlFor="ubicacion">Ubicación</label>
							<input
								placeholder="¿Dónde ocurrió el incidente?"
								type="text"
								className="form-control form-control-sm"
								id="ubicacion"
								onChange={(e) => {
									setData({
										...data,
										ubicacion: e.target.value.toUpperCase(),
									});
								}}
								value={data.ubicacion}
								required
							></input>
						</div>
						<div className="col-lg-12 mb-3">
							<label htmlFor="destino">Destino</label>
							<input
								placeholder="¿Hacia dónde se dirige?"
								type="text"
								className="form-control form-control-sm"
								id="destino"
								onChange={(e) => {
									setData({
										...data,
										destino: e.target.value.toUpperCase(),
									});
								}}
								value={data.destino}
								required
							></input>
						</div>
						<div className="col-lg-12 mb-3">
							<DateTimePicker
								label={selectedReport ? selectedReport.fechaSiniestro : ''}
								selectedDate={selectedDate}
								handleDateChange={handleDateChange}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="card c-crane mb-2">
				<div className="card-header">Datos Grúa</div>
				<div className="card-body">
					<div className="form-row">
						<div className="col-lg-12 col-md-12 col-sm-12 mb-3">
							<Form.Group
								style={{
									marginTop: "2px",
									marginBottom: "2px",
								}}
							>
								<Form.Label>Seleccionar Area</Form.Label>
								<Typeahead
									id="basic-typeahead-multiple"
									labelKey="name"
									multiple
									onChange={SetAreaTruckSelect}
									options={truckAreas}
									placeholder="Escriba el area de cobertura"
									selected={areaTruckSelect}
									size={"small"}
								/>
							</Form.Group>
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12 mb-3">
							<label htmlFor="gruerosSelect">
								Seleccionar gruero
							</label>
							<Typeahead
								id="basic-typeahead-single"
								labelKey="gruaDeServicio"
								onChange={setDataTrucks}
								options={trucks}
								placeholder="Escriba el nombre del gruero"
								selected={dataTrucks}
								// maxResults={2}
								// positionFixed={true}
								size={"small"}
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="col-lg-5 mb-3">
							<label htmlFor="direccion2">Dirección</label>
							<textarea
								type="text"
								className="form-control form-control-sm"
								id="direccionGruero"
								value={data.direccionGruero}
								required
								disabled
							></textarea>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="tel-grua">Tel:</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="telGruero"
								value={data.telGruero}
								required
								disabled
							></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="tel-grua">Cel:</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="celGruero"
								value={data.celGruero}
								required
								disabled
							></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="contacto">Contacto</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="contactoGruero"
								value={data.contactoGruero}
								required
								disabled
							></input>
						</div>
					</div>
					<div className="form-row">
						<div className="col-lg-12 mb-3">
							<label htmlFor="contacto">Comentarios</label>
							<textarea
								type="text"
								className="form-control form-control-sm"
								id="comentarioGruero"
								onChange={(e) => {
									setData({
										...data,
										comentarioGruero: e.target.value.toUpperCase(),
									});
								}}
								value={data.comentarioGruero}
							></textarea>
						</div>
					</div>
				</div>
			</div>
			<div className="card c-precio mb-2">
				<div className="card-header">Resúmen</div>
				<div className="card-body">
					<div className="form-row mb-3">
						<div className="col-lg-4" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
							<div className="form-row">
								<div className="col-lg-12">
									<div className="form-check form-check-inline">
										<input
											className="form-check-input rad"
											name="resumeRadio"
											type="radio"
											id="inlineRad1"
											value="DN"
											checked={data.dia === "DN" ? true : false}
											onChange={(e) => {
												setData({
													...data,
													dia: e.target.value,
												});
											}}
										></input>
										<label
											className="form-check-label"
											htmlFor="inlineRad1"
										>
											Día Normal
										</label>
									</div>
									<div className="form-check form-check-inline">
										<input
											className="form-check-input rad"
											name="resumeRadio"
											type="radio"
											id="inlineRad2"
											value="DF"
											checked={data.dia === "DF" ? true : false}
											onChange={(e) => {
												setData({
													...data,
													dia: e.target.value,
												});
											}}
										></input>
										<label
											className="form-check-label"
											htmlFor="inlineRad2"
										>
											Fin de Semana/Feriado
										</label>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="form-check form-check-inline">
										<input
											className="form-check-input rad"
											name="noche"
											type="checkbox"
											id="noche"
											value="noche"
											checked={data.noche}
											onChange={(e) => {
												setData({
													...data,
													noche: e.target.checked,
												});
											}}
										></input>
										<label
											className="form-check-label"
											htmlFor="noche"
										>
											Noche
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-8" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
							{/* Pago Aproximado Proinsa */}
							<div className="form-row">
								<div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
									<label htmlFor="precio">{Number(precioCliente) > 0 ? 'Pago Proinsa' : 'Pago Aproximado'}</label>
									<input
										key="precio"
										type="text"
										className="form-control form-control-sm"
										name="precio"
										id="precio"
										placeholder="RD$ Pesos"
										value={pagoProinsa}
										onChange={handleChange}
										disabled
									/>
								</div>
							</div>

							{/* SOLO PARA PLANES BASICO/MINIBUS */}
							{Number(precioCliente) > 0 &&
								<>
									{/* plus icon */}
									<div style={{ margin: '0 3px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
										<img className="plus-icon" src={plusIcon} alt="plus-icon" />
									</div>
									<div className="form-row">
										<div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
											<label htmlFor="precioCliente">
												Pago Cliente
											</label>
											<input
												key="precioCliente"
												type="text"
												className="form-control form-control-sm"
												name="precioCliente"
												id="precioCliente"
												placeholder="RD$ Pesos"
												value={precioCliente}
												onChange={handleChange}
												disabled
											/>
										</div>
									</div>
								</>
							}

							{/* SOLO PARA PAGO TOTAL*/}
							{Number(precioTotal) > 0 && Number(precioCliente) > 0 && <>
								{/* iquals icon */}
								<div style={{ margin: '0 1px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
									<img className="iquals-icon" src={iqualsIcon} alt="iquals-icon" />
								</div>
								<div className="form-row">
									<div className="col-lg-12" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
										<label htmlFor="precioTotal">
											Pago total
										</label>
										<input
											key="precioTotal"
											type="text"
											className="form-control form-control-sm"
											name="precioTotal"
											id="precioTotal"
											placeholder="RD$ Pesos"
											value={precioTotal}
											onChange={handleChange}
											disabled
										/>
									</div>
								</div>
							</>}

						</div>
					</div>
					<div className="form-row">
						<div className="col-lg-4 mb-3">
							<label htmlFor="tiempoGrua">
								Tiempo de llegada Grúa
							</label>
							<input
								type="number"
								className="form-control form-control-sm"
								id="tiempoGrua"
								name="tiempoGrua"
								placeholder="Minutos"
								onChange={handleChange}
								value={
									data.tiempoGrua <= 0 ? "" : data.tiempoGrua
								}
								required
							></input>
						</div>
						<div className="col-lg-4 mb-3">
							<label htmlFor="tiempoCliente">
								Tiempo de llegada Cliente
							</label>
							<input
								type="number"
								className="form-control form-control-sm"
								id="tiempoCliente"
								name="tiempoCliente"
								placeholder="Minutos"
								onChange={handleChange}
								value={
									data.tiempoCliente <= 0
										? ""
										: data.tiempoCliente
								}
							></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="distancia">Distancia</label>
							<input
								type="number"
								className="form-control form-control-sm"
								id="distancia"
								name="distancia"
								placeholder="Kilómentros"
								onChange={handleChange}
								value={
									data.distancia <= 0 ? "" : data.distancia
								}
								required
							></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="tarifaEspecial">
								Tarifa Especial
							</label>
							<input
								type="number"
								step="0.01"
								min="0"
								className="form-control form-control-sm"
								id="tarifaEspecial"
								name="tarifaEspecial"
								placeholder="RD$ Pesos"
								value={
									data.tarifaEspecial <= 0 ? "" : Number(data.tarifaEspecial)
								}
								onChange={handleChangeTF}
							></input>
						</div>
					</div>
				</div>
			</div>
		</CreateServiceContainer>
	);
};

export default EditReport;
