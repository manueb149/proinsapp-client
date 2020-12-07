import React from "react";
import Modal from "react-bootstrap/Modal";

const DetailsModal = ({ showDetail, setShowDetail, detailSinister, handleDetailCk }) => {
	return (
		<Modal show={showDetail} onHide={() => setShowDetail(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Detalle Siniestro</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="form-row">
					<div className="form-group form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="Volcadura"
							checked={detailSinister.Volcadura}
							onChange={handleDetailCk}
						></input>
						<label className="form-check-label" htmlFor="Volcadura">
							Volcadura
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Incedios"
							checked={detailSinister.Incedios}
							onChange={handleDetailCk}
						></input>
						<label className="form-check-label" htmlFor="Incedios">
							Incedios
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Colision"
							checked={detailSinister.Colision}
							onChange={handleDetailCk}
						></input>
						<label className="form-check-label" htmlFor="Colision">
							Colisión
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Danios"
							checked={detailSinister.Danios}
							onChange={handleDetailCk}
						></input>
						<label className="form-check-label" htmlFor="Danios">
							Daños Mecánicos
						</label>
						<br></br>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default DetailsModal;
