import React, { useState, useEffect, useContext } from "react";
import { serviceDataContext } from "../../contexts/ServiceDataContext";
import { CreateServiceContainer } from "../../layout/Service/Service.style";
import { Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import MapModal from "./MapModal";
import DetailsModal from "./DetailsModal";
import TypesModal from "./TypesModal";
import ConfirmModal from "./ConfirmModal";
import axios from "../../http-common";
import { Form } from "react-bootstrap";
import SnackBar from "../utils/SnackBar";
import SelectRowsTable from "./SelectRowsTable";
import DateTimePicker from "../utils/DateTimePicker";

const CreateService = () => {
	const [showType, setShowType] = useState(false);
	const [showDetail, setShowDetail] = useState(false);
	const [showMap, setShowMap] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [openSB, setOpenSB] = useState(false);

	const ServiceDataContext = useContext(serviceDataContext);
	const {
		data,
		search,
		servicesType,
		detailSinister,
		trucks,
		truckAreas,
		dataTrucks,
		areaTruckSelect,
		severity,
		notification,
		setData,
		setSearch,
		setServiceType,
		setDetailSinister,
		setTrucks,
		setTruckAreas,
		setDataTrucks,
		SetAreaTruckSelect,
		setSeverity,
		setNotification,
		multipleCars,
		setMultipleCars,
		multipleCarsSelect,
		setMultipleCarsSelect,
		selectedDate,
		handleDateChange
	} = ServiceDataContext;

	useEffect(() => {
		const getTrucksAreas = async () => {
			await axios
				.get("/trucksData/areas")
				.then((res) => setTruckAreas(res.data.areas))
				.catch((err) => console.log(err));
		};
		getTrucksAreas();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const getTrucks = async () => {
			await axios
				.post("/trucksData", { region: areaTruckSelect[0] || "" })
				.then((res) => setTrucks(res.data))
				.catch((err) => console.log(err));
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
		const setCar = async () => {
			setData({
				...data,
				poliza: multipleCarsSelect[0].poliza,
				cedula: multipleCarsSelect[0].cedula,
				asegurado: multipleCarsSelect[0].asegurado,
				marca: multipleCarsSelect[0].marca,
				modelo: multipleCarsSelect[0].modelo,
				anio: multipleCarsSelect[0].anio,
				chassis: multipleCarsSelect[0].chassis,
				placa: multipleCarsSelect[0].placa,
				tipoV: multipleCarsSelect[0].tipoVehiculo,
				aseguradora: multipleCarsSelect[0].aseguradora,
				plan: multipleCarsSelect[0].plan,
			});
			setDataTrucks([]);
			SetAreaTruckSelect([]);
		};
		if (multipleCarsSelect.length > 0) setCar();
		// eslint-disable-next-line
	}, [multipleCarsSelect]);

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: Number(e.target.value),
		});
	};

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

	const handleCloseSB = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSB(false);
	};

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
					if (res.data.length < 1) {
						setOpenSB(false);
						setSeverity("error");
						setNotification("No se ha encontrado dicho registro");
						setOpenSB(true);
						return;
					} else if (res.data.length > 1) {
						setData({
							...data,
							poliza: "",
							cedula: "",
							asegurado: "",
							marca: "",
							modelo: "",
							anio: "",
							chassis: "",
							placa: "",
							tipoV: "",
							aseguradora: "",
							plan: "",
						});
						setDataTrucks([]);
						SetAreaTruckSelect([]);
						setMultipleCars(res.data);
					} else {
						setMultipleCars([]);
						setMultipleCarsSelect([]);
						setData({
							...data,
							poliza: res.data[0].poliza,
							cedula: res.data[0].cedula,
							asegurado: res.data[0].asegurado,
							marca: res.data[0].marca,
							modelo: res.data[0].modelo,
							anio: res.data[0].anio,
							chassis: res.data[0].chassis,
							placa: res.data[0].placa,
							tipoV: res.data[0].tipoVehiculo,
							aseguradora: res.data[0].aseguradora,
							plan: res.data[0].plan,
						});
					}
					setDataTrucks([]);
					SetAreaTruckSelect([]);
				})
				.catch((err) => {
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
				message={{
					title: "Guardar Servicio",
					body: "Está seguro que desea guardar este registro?",
				}}
				showConfirm={showConfirm}
				closeConfirm={() => setShowConfirm(false)}
				setOpenSB={setOpenSB}
				setSeverity={setSeverity}
				setNotification={setNotification}
				payload={{
					data,
					dataTrucks,
					areaTruckSelect,
					detailSinister,
					servicesType,
					selectedDate
				}}
			/>

			<SnackBar
				severity={severity}
				notification={notification}
				openSB={openSB}
				handleOpenSB={() => setOpenSB(true)}
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
					<form
						className="form-row"
						onSubmit={(e) => {
							e.preventDefault();
							handleSearch();
						}}
					>
						<div className="col-lg-3 mb-3">
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
								onClick={() => handleSearch()}
							>
								Buscar
							</Button>
						</div>
					</form>
				</div>
			</div>
			{multipleCars.length > 1 ? (
				<div className="card c-search mb-2">
					<div className="card-header">
						Asegurador con polizas comunes
					</div>
					<div className="card-body">
						<div className="form-row">
							<div className="col-12 mb-3">
								<SelectRowsTable
									options={multipleCars}
									onChange={setMultipleCarsSelect}
								/>
							</div>
						</div>
					</div>
				</div>
			) : null}
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
					<div className="form-row">
						<div className="col-lg-12 mb-3">
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
						<div className="col-lg-3 mb-3">
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
						<div className="col-lg-3 mb-3">
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
									data.tiempoCliente <= 0 ? "" : data.tiempoCliente
								}
								required
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
							<label htmlFor="precio">Precio Aproximado</label>
							<input
								type="number"
								className="form-control form-control-sm"
								name="precio"
								id="precio"
								placeholder="RD$ Pesos"
								value={data.precio <= 0 ? "" : data.precio}
								onChange={handleChange}
								disabled
							></input>
						</div>
					</div>
				</div>
			</div>
		</CreateServiceContainer>
	);
};

export default CreateService;
