import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CustomTextField from "../utils/CustomTextField";
import customFormats from "../utils/customFormats";
import { DetailsModalContainer } from "../../layout/Service/Service.style";

const DetailsModal = ({
	showDetail,
	setShowDetail,
	detailSinister,
	handleDetailCk,
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
			show={showDetail}
			onHide={() => setShowDetail(false)}
			dialogClassName="modal-details-create-service"
			aria-labelledby="example-custom-modal-styling-title"
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-custom-modal-styling-title">
					Detalle Siniestro
				</Modal.Title>
			</Modal.Header>
			<DetailsModalContainer>
				<Modal.Body>
					{/* <div className="form-row">
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
				</div> */}

					<div className="form-row px-3">
						<div className="col-sm-12 col-md-6 col-lg-4 mb-3 ml-1 mr-1">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"VO"}
									LongName={"Volcaduras"}
									Format={
										customFormats.LessNumberFormatCustom
									}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 col-lg-4 mb-3 ml-1 mr-1">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"IN"}
									LongName={"Incendios"}
									Format={
										customFormats.LessNumberFormatCustom
									}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 col-lg-4 mb-3 ml-1 mr-1">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"CO"}
									LongName={"Colisión"}
									Format={
										customFormats.LessNumberFormatCustom
									}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 col-lg-4 mb-3 ml-1 mr-1">
							<div className="row check-input">
								<CustomTextField
									size="small"
									variant="outlined"
									values={values}
									checked={checked}
									setChecked={setChecked}
									shortName={"DM"}
									LongName={"Daños Mecánicos"}
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

export default DetailsModal;
