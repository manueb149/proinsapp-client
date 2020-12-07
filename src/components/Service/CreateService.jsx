import React, { useState, useEffect } from "react";
import { CreateServiceContainer } from "../../layout/Service/Service.style";
import { Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import MapModal from "./MapModal";
import DetailsModal from "./DetailsModal";
import TypesModal from "./TypesModal";
import ConfirmModal from "../utils/ConfirmModal";
import axios from "../../http-common";
import { Form } from "react-bootstrap";
import SnackBar from "../utils/SnackBar";

const CreateService = () => {
	const [showType, setShowType] = useState(false);
	const [showDetail, setShowDetail] = useState(false);
	const [showMap, setShowMap] = useState(false);
	const [truckAreas, setTruckAreas] = useState([]);
	const [trucks, setTrucks] = useState([]);
	const [severity, setSeverity] = useState("info");
	const [notification, setNotification] = useState("");

	const [showConfirm, setShowConfirm] = useState(false);
    const closeConfirm = () => setShowConfirm(false);

	const [singleSelection, setSingleSelection] = useState([]);
	const [multiSelections, setMultiSelections] = useState([]);

	const [openSB, setOpenSB] = React.useState(false);

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

	useEffect(() => {
		const getTrucksAreas = async () => {
			await axios
				.get("/trucksData/areas")
				.then((res) => setTruckAreas(res.data.areas))
				.catch((err) => console.log(err));
		};
		getTrucksAreas();
	}, []);

	useEffect(() => {
		const getTrucks = async () => {
			await axios
				.post("/trucksData", { region: multiSelections[0] || "" })
				.then((res) => setTrucks(res.data))
				.catch((err) => console.log(err));
		};
		getTrucks();
	}, [multiSelections]);

	useEffect(() => {
		const setGrueroData = () => {
			setData({
				...data,
				direccionGruero: singleSelection[0].direccion || "",
				telGruero: singleSelection[0].telOficina || "",
				celGruero: singleSelection[0].telCelular || "",
				contactoGruero: singleSelection[0].contacto || "",
			});
		};
		if (singleSelection[0]) {
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
	}, [singleSelection]);

	const handleServiceTypeCk = (e) => {
		setServiceType({
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

	const handleOpenSB = () => {
		setOpenSB(true);
	};

	const handleCloseSB = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSB(false);
	};

	// const handleCreateService = async () => {
	// 	if (
	// 		String(data.asegurado).length === 0 ||
	// 		String(data.dia).length === 0 ||
	// 		String(data.ubicacion).length === 0 ||
	// 		String(data.destino).length === 0 ||
	// 		Number(data.tiempoGrua) === 0 ||
	// 		Number(data.tiempoCliente) === 0 ||
	// 		Number(data.distancia) === 0 ||
	// 		Number(data.precio) === 0 ||
	// 		singleSelection.length === 0 ||
	// 		multiSelections.length === 0
	// 	) {
	// 		setOpenSB(false);
	// 		setSeverity("warning");
	// 		setNotification("Faltan campos por completar!");
	// 		setOpenSB(true);
	// 		return;
	// 	} else {
	// 		await axios
	// 			.post("/service/create", {
	// 				data,
	// 				singleSelection,
	// 				multiSelections,
	// 				detailSinister,
	// 				servicesType,
	// 			})
	// 			.then((res) => {
	// 				console.log(res);
	// 				setOpenSB(false);
	// 				setSeverity("success");
	// 				setNotification("Servicio Registrado!");
	// 				setOpenSB(true);
	// 			})
	// 			.catch((err) => console.log(err));
	// 	}
	// };

	const handleSearch = async () => {
		if (search.id.trim() === "" || search.type.trim() === "") {
			return;
		} else if (search.type === "codigo") {
			return;
		} else if (search.id.trim().toUpperCase() === "TRAMITE") {
			return;
		} else {
			await axios
				.get(`/data/${search.type}/${search.id}`)
				.then((res) => {
					setData({
						...data,
						poliza: res.data.poliza,
						cedula: res.data.cedula,
						asegurado: res.data.asegurado,
						marca: res.data.marca,
						modelo: res.data.modelo,
						anio: res.data.anio,
						chassis: res.data.chassis,
						placa: res.data.placa,
						tipoV: res.data.tipoVehiculo,
						aseguradora: res.data.aseguradora,
						plan: res.data.plan,
					});
				})
				.catch((err) => {
					console.log(err.response.data.message);
					setOpenSB(false);
					setSeverity("error");
					setNotification(err.response.data.message);
					setOpenSB(true);
				});
		}
	};

	return (
		<CreateServiceContainer>
			<ConfirmModal 
				message={{title: "Guardar Servicio", body: "Está seguro que desea guardar este registro?"}}
				showConfirm={showConfirm}
				closeConfirm={closeConfirm}
				setOpenSB={setOpenSB}
				setSeverity={setSeverity}
				setNotification={setNotification}
				payload= {{
					data,
					singleSelection,
					multiSelections,
					detailSinister,
					servicesType,
				}}
			/>

			<SnackBar
				severity={severity}
				notification={notification}
				openSB={openSB}
				handleOpenSB={handleOpenSB}
				handleCloseSB={handleCloseSB}
			/>

			<TypesModal
				showType={showType}
				setShowType={setShowType}
				servicesType={servicesType}
				handleServiceTypeCk={handleServiceTypeCk}
			/>
			<DetailsModal
				showDetail={showDetail}
				setShowDetail={setShowDetail}
				detailSinister={detailSinister}
				handleDetailCk={handleDetailCk}
			/>
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
				onClick={() => setShowMap(true)}
			>
				Mostrar Mapa
			</Button>
			<Button 
				variant="primary"
				size="sm"
				onClick={() => setShowConfirm(true)}
			>
				Guardar
			</Button>
		
			<div className="card c-search mb-2">
				<div className="card-header">Búsqueda</div>
				<div className="card-body">
					<div className="form-row">
						<div className="col-lg-3 mb-3">
							<input
								type="text"
								className="form-control form-control-sm"
								id="SearchChoise"
								onChange={(e) =>
									setSearch({ ...search, id: e.target.value })
								}
								required
							></input>
						</div>
						<div className="col-lg-3 mb-3">
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
						<div className="col-lg-3 mb-3">
							<Button
								variant="primary"
								size="sm"
								onClick={handleSearch}
							>
								Buscar
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="card c-vehicle mb-2">
				<div className="card-header">Datos del Vehículo</div>
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
								value={data.tipoV || ""}
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
							<label htmlFor="tel1">Teléfono 1</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="tel1"
								required
								disabled
							></input>
						</div>
						<div className="col-lg-4 mb-3">
							<label htmlFor="tel2">Teléfono 2</label>
							<input
								type="text"
								className="form-control form-control-sm"
								id="tel2"
								required
								disabled
							></input>
						</div>
					</div>
				</div>
			</div>
			<div className="card c-sinister mb-2">
				<div className="card-header">Datos del Siniestro</div>
				<div className="card-body">
					<div className="form-row">
						<div className="col-lg-12 mb-3">
							<label htmlFor="ubicacion">Ubicación</label>
							<input
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
									onChange={setMultiSelections}
									options={truckAreas}
									placeholder="Escriba el area de cobertura"
									selected={multiSelections}
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
								onChange={setSingleSelection}
								options={trucks}
								placeholder="Escriba el nombre del gruero"
								selected={singleSelection}
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
					<div className="form-row">
						<div className="col-lg-12 mb-3">
							<div className="form-check form-check-inline">
								<input
									className="form-check-input rad"
									name="resumeRadio"
									type="radio"
									id="inlineRad1"
									value="DN"
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
									Día Feriado
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input rad"
									name="resumeRadio"
									type="radio"
									id="inlineRad3"
									value="N"
									onChange={(e) => {
										setData({
											...data,
											dia: e.target.value,
										});
									}}
								></input>
								<label
									className="form-check-label"
									htmlFor="inlineRad3"
								>
									Noche
								</label>
							</div>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="timepoLlegadaGrua">
								Tiempo de llegada Grúa
							</label>
							<input
								type="number"
								className="form-control form-control-sm"
								id="timepoLlegada"
								placeholder="Minutos"
								onChange={(e) => {
									setData({
										...data,
										tiempoGrua: Number(e.target.value),
									});
								}}
								value={data.tiempoGrua}
								required
							></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="timepoLlegadaCliente">
								Tiempo de llegada Cliente
							</label>
							<input
								type="number"
								className="form-control form-control-sm"
								id="timepoLlegadaCliente"
								placeholder="Minutos"
								onChange={(e) => {
									setData({
										...data,
										tiempoCliente: Number(e.target.value),
									});
								}}
								value={data.tiempoCliente}
								required
							></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="distancia">Distancia</label>
							<input
								type="number"
								className="form-control form-control-sm"
								id="distancia"
								placeholder="Kilómentros"
								onChange={(e) => {
									setData({
										...data,
										distancia: Number(e.target.value),
									});
								}}
								value={data.distancia}
								required
							></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="precio">Precio Aproximado</label>
							<input
								type="number"
								className="form-control form-control-sm"
								id="precio"
								placeholder="RD$ Pesos"
								onChange={(e) => {
									setData({
										...data,
										precio: Number(e.target.value),
									});
								}}
								value={data.precio}
								required
							></input>
						</div>
					</div>
				</div>
			</div>
		</CreateServiceContainer>
	);
};

export default CreateService;
