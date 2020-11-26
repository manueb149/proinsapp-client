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
							id="Check20"
							checked={detailSinister.Check20}
							onChange={handleDetailCk}
						></input>
						<label className="form-check-label" htmlFor="Check20">
							Volcadura
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check21"
							checked={detailSinister.Check21}
							onChange={handleDetailCk}
						></input>
						<label className="form-check-label" htmlFor="Check21">
							Incedios
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check22"
							checked={detailSinister.Check22}
							onChange={handleDetailCk}
						></input>
						<label className="form-check-label" htmlFor="Check22">
							Colision
						</label>
						<br></br>
						<input
							type="checkbox"
							className="form-check-input"
							id="Check23"
							checked={detailSinister.Check23}
							onChange={handleDetailCk}
						></input>
						<label className="form-check-label" htmlFor="Check23">
							Volcadura
						</label>
						<br></br>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default DetailsModal;
