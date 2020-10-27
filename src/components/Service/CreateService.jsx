import React, { useState } from "react";
import { CreateServiceContainer } from "../../layout/Service/Service.style";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Typeahead } from "react-bootstrap-typeahead";
import MapModal from './MapService';
// import axios from 'axios';
import axios from '../../http-common';
// import { Form, Button } from "react-bootstrap";

const Services = () => {
	const [showType, setShowType] = useState(false);
	const handleCloseType = () => setShowType(false);
	const handleShowType = () => setShowType(true);

	const [showDetail, setShowDetail] = useState(false);
	const handleCloseDetail = () => setShowDetail(false);
	const handleShowDetail = () => setShowDetail(true);

	const [showMap, setShowMap] = useState(false);

	const [singleSelection, setSingleSelection] = useState([]);
	// eslint-disable-next-line
	const [grueros, setGrueros] = useState(['Gruero1','Gruero2','Gruero3',,'Gruero4','Gruero5']);
	const [search, setSearch] = useState({
		SearchChoise: ""
	});
	const [data, setData] = useState({
		poliza: "",
		asegurado: "",
		marca: "",
		modelo: "",
		anio: "",
		chassis: "",
		placa: "",
		tipoV: "",
		aseguradora: ""
	});

	const [servicesType, setServiceType] = useState({
		Check10: false, Check11: false, Check12: false, Check13: false, Check14: false, 
		Check15: false, Check16: false, Check17: false, Check18: false, Check19: false
	});
	const handleServiceTypeCk = (e) => {
		setServiceType({
			...servicesType,
			[e.target.id]: !servicesType[e.target.id]
		})
	}

	const [detailSinister, setDetailSinister] = useState({
		Check20: false, Check21: false, Check22: false, Check23: false
	});
	const handleDetailCk = (e) => {
		setDetailSinister({
			...detailSinister,
			[e.target.id]: !detailSinister[e.target.id]
		})
	}

	const handleSearch = async () => {
		if(search.poliza.trim()!==''){
			await axios.get(`/data/poliza/${search.poliza}`)
				.then(res => {
					setData({
						poliza: res.data[0],
						asegurado: res.data[1],
						marca: res.data[4],
						modelo: res.data[5],
						anio: res.data[6],
						chassis: res.data[7],
						placa: res.data[8],
						tipoV: res.data[9],
						aseguradora: " Seguros La Internacional"
					})
				})
		}
	}

	return (
		<CreateServiceContainer>
			<Modal show={showType} onHide={handleCloseType}>
				<Modal.Header closeButton>
					<Modal.Title>Tipos de servicios</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-row">
						<div className="form-group form-check">
							<input type="checkbox" className="form-check-input" id="Check10" checked={servicesType.Check10} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check10">Transporte on Grúa</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check11" checked={servicesType.Check11} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check11">Extracción</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check12" checked={servicesType.Check12} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check12">Cerrageria</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check13" checked={servicesType.Check13} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check13">Cambio de Gomas</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check14" checked={servicesType.Check14} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check14">Corriente y Encendido</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check15" checked={servicesType.Check15} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check15">Suministros y Gasolina</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check16" checked={servicesType.Check16} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check16">Peaje</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check17" checked={servicesType.Check17} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check17">Transporte on Grúa</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check18" checked={servicesType.Check18} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check18">Ext. Peso</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check19" checked={servicesType.Check19} onChange={handleServiceTypeCk}></input>
							<label className="form-check-label" htmlFor="Check19">Sub. Loma</label><br></br>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<Modal show={showDetail} onHide={handleCloseDetail}>
				<Modal.Header closeButton>
					<Modal.Title>Detalle Siniestro</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-row">
						<div className="form-group form-check">
							<input type="checkbox" className="form-check-input" id="Check20" checked={detailSinister.Check20} onChange={handleDetailCk}></input>
							<label className="form-check-label" htmlFor="Check20">Volcadura</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check21" checked={detailSinister.Check21} onChange={handleDetailCk}></input>
							<label className="form-check-label" htmlFor="Check21">Incedios</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check22" checked={detailSinister.Check22} onChange={handleDetailCk}></input>
							<label className="form-check-label" htmlFor="Check22">Colision</label><br></br>
							<input type="checkbox" className="form-check-input" id="Check23" checked={detailSinister.Check23} onChange={handleDetailCk}></input>
							<label className="form-check-label" htmlFor="Check23">Volcadura</label><br></br>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<MapModal 
				showMap={showMap}
				setShowMap={setShowMap}
			/>


			<Button variant="primary" size="sm" onClick={handleShowType}>Tipos de servicios</Button>
			<Button variant="primary" size="sm" onClick={handleShowDetail}>Detalles siniestro</Button>
			<Button variant="primary" size="sm" onClick={() => setShowMap(true)}>Mostrar Mapa</Button>
			<Button variant="primary" size="sm">Guardar</Button>

			<div className="card c-search mb-2">
				<div className="card-header">Búsqueda</div>
				<div className="card-body">
					<div className="form-row">
						<div className="col-lg-3 mb-3">
							<input 
								type="text" 
								className="form-control form-control-sm" 
								id="SearchChoise" 
								onChange={(e) => setSearch({poliza: e.target.value})} 
								required
							></input>
						</div>
						<div className="col-lg-3 mb-3">
							<select className="form-control form-control-sm" id="SearchChoise" required>
								<option defaultValue={"poliza"} disabled>Elija un opción de búsqueda...</option>
								<option value={"poliza"}>Póliza</option>
								<option value={"codigo"}>Código</option>
								<option value={"cedula"}>Cédula</option>
								<option value={"placa"}>Placa</option>
								<option value={"chassis"}>Chassis</option>
							</select>
						</div>
						<div className="col-lg-3 mb-3">
							<Button variant="primary" size="sm" onClick={handleSearch}>Buscar</Button>
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
							<input type="text" className="form-control form-control-sm" id="no-poliza" value={data.poliza} required disabled></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="chassis">Chassis</label>
							<input type="text" className="form-control form-control-sm" id="chassis" value={data.chassis} required disabled></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="tipo">Tipo</label>
							<input type="text" className="form-control form-control-sm" id="tipo" value={data.tipoV} required disabled></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="marca">Marca</label>
							<input type="text" className="form-control form-control-sm" id="marca" value={data.marca} required disabled></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="modelo">Modelo</label>
							<input type="text" className="form-control form-control-sm" id="modelo" value={data.marca} required disabled></input>
						</div>
					</div>
					<div className="form-row">
						<div className="col-lg-2 mb-3">
							<label htmlFor="anio">Año</label>
							<input type="text" className="form-control form-control-sm" id="anio" value={data.anio} required disabled></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="placa2">Placa</label>
							<input type="text" className="form-control form-control-sm" id="placa2" value={data.placa} required disabled></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="aseg">Aseguradora</label>
							<input type="text" className="form-control form-control-sm" id="aseg" value={data.aseguradora} required disabled></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="plan">Plan</label>
							<input type="text" className="form-control form-control-sm" id="plan" required disabled></input>
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
							<input type="text" className="form-control form-control-sm" id="nombre" value={data.asegurado} required disabled></input>
						</div>
					</div>
					<div className="form-row">
						<div className="col-lg-12 mb-3">
							<label htmlFor="direccion">Dirección</label>
							<input type="text" className="form-control form-control-sm" id="direccion" required disabled></input>
						</div>
					</div>
					<div className="form-row">
						<div className="col-lg-4 mb-3">
							<label htmlFor="cedula2">Cédula</label>
							<input type="text" className="form-control form-control-sm" id="cedula2" required disabled></input>
						</div>
						<div className="col-lg-4 mb-3">
							<label htmlFor="tel1">Teléfono 1</label>
							<input type="text" className="form-control form-control-sm" id="tel1" required disabled></input>
						</div>
						<div className="col-lg-4 mb-3">
							<label htmlFor="tel2">Teléfono 2</label>
							<input type="text" className="form-control form-control-sm" id="tel2" required disabled></input>
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
							<input type="text" className="form-control form-control-sm" id="ubicacion" required></input>
						</div>
						<div className="col-lg-12 mb-3">
							<label htmlFor="destino">Destino</label>
							<input type="text" className="form-control form-control-sm" id="destino" required></input>
						</div>
					</div>
				</div>
			</div>
			<div className="card c-crane mb-2">
				<div className="card-header">Datos Grúa</div>
				<div className="card-body">
					<div className="form-row">
						<div className="col-lg-2 mb-3">
							<label htmlFor="nombre1">Nombre</label>
							<input type="text" className="form-control form-control-sm" id="nombre1" required disabled></input>
						</div>
						<div className="col-lg-4 mb-3">
							<label htmlFor="gruero">Gruero</label>
							<input type="text" className="form-control form-control-sm" id="gruero" required disabled></input>
						</div>
						<div className="col-md-6 mb-3">
							<label htmlFor="gruerosSelect">Seleccionar gruero</label>
							<Typeahead
								id="basic-typeahead-single"
								labelKey="gruerosSelect"
								onChange={setSingleSelection}
								options={grueros}
								placeholder="Escriba el nombre del gruero"
								selected={singleSelection}
								maxResults={2}
								positionFixed={true}
								size={'small'}
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="col-lg-7 mb-3">
							<label htmlFor="direccion2">Dirección</label>
							<textarea type="text" className="form-control form-control-sm" id="direccion2" required disabled></textarea>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="tel-grua">Tel:</label>
							<input type="text" className="form-control form-control-sm" id="tel-grua" required disabled></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="contacto">Contacto</label>
							<input type="text" className="form-control form-control-sm" id="contacto" required disabled></input>
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
								<input className="form-check-input rad" name="resumeRadio" type="radio" id="inlineRad1" value="DN"></input>
								<label className="form-check-label" htmlFor="inlineRad1">Día Normal</label>
							</div>
							<div className="form-check form-check-inline">
								<input className="form-check-input rad" name="resumeRadio" type="radio" id="inlineRad2" value="DF"></input>
								<label className="form-check-label" htmlFor="inlineRad2">Día Feriado</label>
							</div>
							<div className="form-check form-check-inline">
								<input className="form-check-input rad" name="resumeRadio" type="radio" id="inlineRad3" value="N"></input>
								<label className="form-check-label" htmlFor="inlineRad3">Noche</label>
							</div>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="timepoLlegadaGrua">Tiempo de llegada Grúa</label>
							<input type="text" className="form-control form-control-sm" id="timepoLlegada" placeholder="Minutos" required></input>
						</div>
						<div className="col-lg-3 mb-3">
							<label htmlFor="timepoLlegadaCliente">Tiempo de llegada Cliente</label>
							<input type="text" className="form-control form-control-sm" id="timepoLlegadaCliente" placeholder="Minutos" required></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="distancia">Distancia</label>
							<input type="text" className="form-control form-control-sm" id="distancia" placeholder="Kilómentros" required></input>
						</div>
						<div className="col-lg-2 mb-3">
							<label htmlFor="precio">Precio Aproximado</label>
							<input type="text" className="form-control form-control-sm" id="precio" placeholder="RD$ pesos " required></input>
						</div>
					</div>
				</div>
			</div>
		</CreateServiceContainer>
	);
};

export default Services;
