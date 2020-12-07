import React from "react";
import Modal from "react-bootstrap/Modal";

const TypesService = ({ showType, setShowType, servicesType, handleServiceTypeCk }) => {
	return (
		<Modal show={showType} onHide={() => setShowType(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Tipos de servicios</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="form-row">
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
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default TypesService;
