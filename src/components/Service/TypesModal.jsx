import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CustomTextField from "../utils/CustomTextField";
import customFormats from "../utils/customFormats";
import { DetailsModalContainer } from "../../layout/Service/Service.style";

const TypesService = ({
	valuesContext,
	values,
	setValues,
	checked,
	setChecked,
	showType,
	setShowType,
	data,
	dataTrucks,
}) => {
	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]:
				(event.target.name === "LM" || event.target.name === "SP")
					? Number(event.target.value) <= Number(data.distancia)
						? event.target.value
						: ""
					: Number(event.target.value) <=
						Number(valuesContext[event.target.name])
						? event.target.value
						: "",
		});
	};

	useEffect(() => {
		const handleChangeCustom = () => {
			setValues({
				...values,
				TG: dataTrucks.length > 0
					? dataTrucks[0].trasporteGrua
					: valuesContext.TG,
				SP0: valuesContext.SP,
				SL: valuesContext.LM,
				TN: valuesContext.TN,
			});
		};
		handleChangeCustom();
		// eslint-disable-next-line
	}, [checked]);

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
									alwaysDisabled
								// noCheck
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
									Format={customFormats.NumberFormatCustom}
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
									Format={customFormats.NumberFormatCustom}
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
									Format={customFormats.KmFormatCustom}
									handleChange={handleChange}
									alwaysDisabled={data.distancia <= 15 ? true : false}
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
									Format={customFormats.KmFormatCustom}
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
									shortName={"MN"}
									LongName={"Maniobra"}
									Format={customFormats.NumberFormatCustom}
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
									Format={customFormats.NumberFormatCustom}
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
									Format={customFormats.NumberFormatCustom}
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
									Format={customFormats.NumberFormatCustom}
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
									Format={customFormats.NumberFormatCustom}
									handleChange={handleChange}
								/>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3"></div>
						<div className="col-sm-12 col-md-12 col-lg-4 mb-3"></div>
					</div>
				</Modal.Body>
			</DetailsModalContainer>
		</Modal>
	);
};

export default TypesService;
