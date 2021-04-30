import React from "react";
import Modal from "react-bootstrap/Modal";
// import CustomTextField from "../utils/CustomTextField";
// import customFormats from "../utils/customFormats";
import LegendTabs from "./LegendTabs";
import { LegendModalContainer } from "../../layout/Service/Service.style";

const TypesService = ({showLegend,setShowLegend}) => {
	return (
		<Modal
			size="lg"
			show={showLegend}
			onHide={() => setShowLegend(false)}
			dialogClassName="modal-type-create-service"
			aria-labelledby="example-custom-modal-styling-title"
		>
			<Modal.Header closeButton>
				<Modal.Title>Leyenda</Modal.Title>
			</Modal.Header>
			<LegendModalContainer>
				<Modal.Body>
					<LegendTabs />
				</Modal.Body>
			</LegendModalContainer>
		</Modal>
	);
};

export default TypesService;
