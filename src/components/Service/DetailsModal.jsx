import React from "react";
import Modal from "react-bootstrap/Modal";
import CustomTextField from "../utils/CustomTextField";
import customFormats from "../utils/customFormats";
import { DetailsModalContainer } from "../../layout/Service/Service.style";

const DetailsModal = ({
	valuesContext,
	values,
	setValues,
	checked,
	setChecked,
	showDetail,
	setShowDetail
}) => {

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]:
				Number(event.target.value) <= Number(valuesContext[event.target.name])
					? event.target.value
					: ""
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
										customFormats.NumberFormatCustom
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
										customFormats.NumberFormatCustom
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
										customFormats.NumberFormatCustom
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
										customFormats.NumberFormatCustom
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
