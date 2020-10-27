import React from "react";
import Modal from "react-bootstrap/Modal";

const MapService = ({ showMap, setShowMap }) => {
	return (
		<Modal
			show={showMap}
			onHide={() => setShowMap(false)}
			dialogClassName="modal-map-create-service"
			aria-labelledby="example-custom-modal-styling-title"
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-custom-modal-styling-title">
					Mapa
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>

			</Modal.Body>
		</Modal>
	);
};

export default MapService;
