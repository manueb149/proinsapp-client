import React from "react";
import Modal from "react-bootstrap/Modal";
// import CustomTextField from "../utils/CustomTextField";
// import customFormats from "../utils/customFormats";
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
					<div className="legend">
						<div className="legend-inner">
							<div className="serv legend-line">
								<div className="dot"></div>
								<div className="label">SERV{" ->"}</div>
								<div className="description">Cantidad de servicios</div>
							</div>
							<div className="svl legend-line">
								<div className="dot"></div>
								<div className="label">SVL{" ->"}</div>
								<div className="description">Cantidad de Servicios de Vehículos Livianos</div>
							</div>
							<div className="svp legend-line">
								<div className="dot"></div>
								<div className="label">SVP{" ->"}</div>
								<div className="description">Cantidad de Servicio de Vehículos Pesados</div>
							</div>
							<div className="spv legend-line">
								<div className="dot"></div>
								<div className="label">SPV{" ->"}</div>
								<div className="description">Cantidad de Servicios Plan VIP</div>
							</div>
							<div className="spb legend-line">
								<div className="dot"></div>
								<div className="label">SPB{" ->"}</div>
								<div className="description">Cantidad de Servicios Plan Básico</div>
							</div>
							<div className="spm legend-line">
								<div className="dot"></div>
								<div className="label">SPM{" ->"}</div>
								<div className="description">Cantidad de Servicios Plan Minibus</div>
							</div>
							<div className="kmr legend-line">
								<div className="dot"></div>
								<div className="label">KMR{" ->"}</div>
								<div className="description">Cantidad de Km recorridos (Km/1000)</div>
							</div>
							<div className="sd legend-line">
								<div className="dot"></div>
								<div className="label">SD{" ->"}</div>
								<div className="description">Cantidad de Servicios Diurnos</div>
							</div>
							<div className="sn legend-line">
								<div className="dot"></div>
								<div className="label">SN{" ->"}</div>
								<div className="description">Cantidad de Servicios Nocturnos</div>
							</div>
							<div className="sf legend-line">
								<div className="dot"></div>
								<div className="label">SF{" ->"}</div>
								<div className="description">Cantidad de Servicios Feriados</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</LegendModalContainer>
		</Modal>
	);
};

export default TypesService;
