import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CustomTextField from "../utils/CustomTextField";
import customFormats from "../utils/customFormats";
import { DetailsModalContainer } from "../../layout/Service/Service.style";

const TypesService = ({
	showType,
	setShowType,
	servicesType,
	handleServiceTypeCk,
}) => {
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
	});

	const [checked, setChecked] = useState({
		TG: false,
		CR: false,
		EX: false,
		SP: false,
		LM: false,
		PE: false,
		SG: false,
		CE: false,
		CG: false,
		VO: false,
		IN: false,
		CO: false,
		DM: false,
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<Modal
			size="xl"
			show={showType}
			onHide={() => setShowType(false)}
			dialogClassName="modal-type-create-service"
			aria-labelledby="example-custom-modal-styling-title"
		>
			<Modal.Header closeButton>
				<Modal.Title>Tipos de servicios</Modal.Title>
			</Modal.Header>
			<DetailsModalContainer>
				<Modal.Body>
					{/* <div className="form-row">
					<div className="form-group form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="TranGrua"
							checked={servicesType.TranGrua}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="TranGrua">
							Transporte con Grúa
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Extraccion"
							checked={servicesType.Extraccion}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Extraccion">
							Extracción
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Cerrageria"
							checked={servicesType.Cerrageria}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Cerrageria">
							Cerragería
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="CambioGomas"
							checked={servicesType.CambioGomas}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="CambioGomas">
							Cambio de Gomas
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="CorrienteEncendido"
							checked={servicesType.CorrienteEncendido}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="CorrienteEncendido">
							Corriente y Encendido
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="SuministrosGasolina"
							checked={servicesType.SuministrosGasolina}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="SuministrosGasolina">
							Suministros y Gasolina
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Peaje"
							checked={servicesType.Peaje}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Peaje">
							Peaje
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="ExtPeso"
							checked={servicesType.ExtPeso}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="ExtPeso">
							Ext. Peso
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="SubLoma"
							checked={servicesType.SubLoma}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="SubLoma">
							Sub. Loma
						</label>
						<br></br>
					</div>
				</div> */}
					<div className="form-row px-3">
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"TG"}
									LongName={"Tansporte de Grúa"}
									Format={customFormats.PesoKmFormatCustom}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"CR"}
									LongName={"Cerragería"}
									Format={
										customFormats.LessNumberFormatCustom
									}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"EX"}
									LongName={"Extracción"}
									Format={
										customFormats.LessNumberFormatCustom
									}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"SP"}
									LongName={"Sobre peso"}
									Format={customFormats.PercentFormatCustom}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"LM"}
									LongName={"Subida loma"}
									Format={customFormats.PesoKmFormatCustom}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"PE"}
									LongName={"Peaje"}
									Format={
										customFormats.LessNumberFormatCustom
									}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"SG"}
									LongName={"Suministros y Gasolina"}
									Format={
										customFormats.LessNumberFormatCustom
									}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"CE"}
									LongName={"Corriente y Encendido"}
									Format={
										customFormats.LessNumberFormatCustom
									}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"CG"}
									LongName={"Cambio de Gomas"}
									Format={
										customFormats.LessNumberFormatCustom
									}
									handleChange={handleChange}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
			</DetailsModalContainer>
		</Modal>
	);
};

export default TypesService;
