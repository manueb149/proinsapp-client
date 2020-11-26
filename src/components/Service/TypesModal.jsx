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
							id="Check10"
							checked={servicesType.Check10}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check10">
							Transporte on Grúa
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check11"
							checked={servicesType.Check11}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check11">
							Extracción
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check12"
							checked={servicesType.Check12}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check12">
							Cerrageria
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check13"
							checked={servicesType.Check13}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check13">
							Cambio de Gomas
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check14"
							checked={servicesType.Check14}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check14">
							Corriente y Encendido
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check15"
							checked={servicesType.Check15}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check15">
							Suministros y Gasolina
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check16"
							checked={servicesType.Check16}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check16">
							Peaje
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check17"
							checked={servicesType.Check17}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check17">
							Transporte on Grúa
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check18"
							checked={servicesType.Check18}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check18">
							Ext. Peso
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check19"
							checked={servicesType.Check19}
							onChange={handleServiceTypeCk}
						></input>
						<label className="form-check-label" htmlFor="Check19">
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
