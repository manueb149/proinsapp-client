import React, { useState, useEffect, useContext } from "react";
import './serviceSummary.scss';
import { SummaryContainer } from "../../../layout/Service/Service.style";
import PropTypes from "prop-types";
import customFormats, { TextMaskCustom } from "../../utils/customFormats";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import summaryCalc from "../../utils/summaryCalc";
import CustomTextField from "../../utils/CustomTextField";
import axios from "../../../config/http-common";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../contexts/auth/authContext";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const ServiceSummary = () => {
	const authContext = useContext(AuthContext);
	const { logout } = authContext;
	const history = useHistory();
	const classes = useStyles();
	const [checked, setChecked] = useState({
		TN: false,
		FF: false,
		EX: false,
		SP: false,
		LM: false,
	});

	const [values, setValues] = useState({
		total: "",
		KmE: "",
		KmL: "",
		KmSP: "",
		CB: "",
		CBPKM: "",
		CP: "",
		TN: "",
		FF: "",
		EX: "",
		SP: "",
		LM: "",
	});

	useEffect(() => {
		const getValues = async () => {
			await axios
				.get("values")
				.then((res) => {
					setValues({
						...values,
						TN: res.data.values.TN,
						FF: res.data.values.FF,
						SP: res.data.values.SP,
					});
				})
				.catch((error) => {
					if (error.response) {
						// Request made and server responded
						if (error.response.data.text === "TNV") {
							logout();
							history.push("/");
						}
						// console.log(error.response.status);
						// console.log(error.response.headers);
					} else if (error.request) {
						// The request was made but no response was received
						console.log(error.request);
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log("Error", error.message);
					}
				});
		};
		getValues();
		// eslint-disable-next-line
	}, []);

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};
	const handleTotal = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<SummaryContainer>
			<div className={classes.root}>
				<div className="card mb-3">
					<div className="card-header mb-3">
						<div className="title-flex">
							<span className="title mb-2 mt-2">
								<h5>Cálculo Resumen de Servicio</h5>
							</span>
							<span
								className="icon-button"
								onClick={() => window.print()}
							>
								<i className="fas fa-print"></i>
							</span>
						</div>
					</div>
					<div className="form-row px-3">
						<div className="col-lg-12 mb-1">
							<div className="card mb-3">
								<div className="card-header">
									<TextField
										disabled
										label="TOTAL SERVICIO"
										value={summaryCalc(values, checked)}
										onChange={handleTotal}
										name="total"
										id="total"
										InputProps={{
											inputComponent:
												customFormats.NumberFormatCustom,
										}}
									/>
								</div>
							</div>
						</div>
						{/*  */}
						<div className="col-lg-6 mb-3">
							<div className="card mb-3">
								<div className="card-header">
									<h5 className="mb-0">Datos del viaje</h5>
								</div>
								<div className="card-body datos-viaje">
									<div className="row" style={{ marginLeft: '0px', marginRight: '0px' }}>
										<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-3">
											<div className="row check-input">
												<TextField
													size="small"
													variant="outlined"
													label={"Km Estipulado"}
													value={values.KmE}
													onChange={handleChange}
													name="KmE"
													id="KmE"
													InputProps={{
														inputComponent:
															customFormats.KmFormatCustom,
													}}
												/>
											</div>
										</div>
										<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-3">
											<div className="row check-input">
												<TextField
													size="small"
													variant="outlined"
													// label="Costo Base Km"
													label={`${Number(values.KmE) > 15 && Number(values.CB) > 0 && !checked.LM
														? `Subtotal = $${(Number(values.KmE) - 15) * Number(values.CB)}`
														: "Costo Base Km"
														}`}
													value={values.CB}
													onChange={handleChange}
													name="CB"
													id="CB"
													InputProps={{
														inputComponent:
															customFormats.PesoKmFormatCustom,
													}}
												/>
											</div>
										</div>
									</div>
									{Number(values.KmE) > 15 ?
										<div className="col-12 mt-3">
											<div className="row check-input">
												<TextField
													disabled
													size="small"
													variant="outlined"
													label="Km de Arranque"
													value={15}
													onChange={handleTotal}
													name="kmArranque"
													id="kmArranque"
													InputProps={{
														inputComponent:
															customFormats.KmFormatCustom,
													}}
												/>
											</div>
										</div>
										: null
									}
									{Number(values.KmE) > 15 ?
										<div className="col-12 mt-3">
											<div className="row check-input">
												<TextField
													disabled
													size="small"
													variant="outlined"
													label="Km sin Arranque"
													value={Number(values.KmE) > 15 ? Number(values.KmE) - 15 : ""}
													onChange={handleTotal}
													name="km sin arranque"
													id="kmSinArranque"
													InputProps={{
														inputComponent:
															customFormats.KmFormatCustom,
													}}
												/>
											</div>
										</div>
										: null
									}
									{Number(values.KmE) > 15 ?
										<div className="col-12 mt-3">
											<div className="row check-input">
												<TextField
													disabled
													size="small"
													variant="outlined"
													label="Total Arranque"
													value={1200}
													onChange={handleTotal}
													name="totalArranque"
													id="totalArranque"
													InputProps={{
														inputComponent:
															customFormats.NumberFormatCustom,
													}}
												/>
											</div>
										</div>
										: null
									}
									{checked.LM ? <div className="separator"></div> : null}
									<div className="col-12 mt-3">
										<div className="row check-input">
											<CustomTextField
												size="small"
												variant="outlined"
												values={values}
												checked={checked}
												setChecked={setChecked}
												shortName={"LM"}
												LongName={"Loma"}
												Format={
													customFormats.PesoKmFormatCustom
												}
												handleChange={handleChange}
												rightCheckBox
											/>
										</div>
									</div>
									{checked.LM ? (
										<div className="col-12 mt-3">
											<div className="row check-input">
												<TextField
													size="small"
													variant="outlined"
													label="Kilómetro de Loma"
													value={Number(values.KmE) > 15
														? Number(values.KmL) <= (Number(values.KmE) - 15) ? values.KmL : ""
														: Number(values.KmL) <= Number(values.KmE) ? values.Kml : ""
													}
													onChange={handleChange}
													name="KmL"
													id="KmL"
													InputProps={{
														inputComponent:
															customFormats.KmFormatCustom,
													}}
												/>
											</div>
										</div>
									) : null}
									{checked.LM && values.LM > 0 && values.KmL ? (
										<div className="col-12 mt-3">
											<div className="row check-input">
												<TextField
													disabled
													size="small"
													variant="outlined"
													label="Total Km de Loma"
													value={Number(values.LM) * Number(values.KmL) >= 0 ? Number(values.LM) * Number(values.KmL) : ""}
													onChange={handleChange}
													name="totalKmLoma"
													id="totalKmLoma"
													InputProps={{
														inputComponent:
															customFormats.NumberFormatCustom,
													}}
												/>
											</div>
										</div>
									) : null}
									{checked.LM ? <div className="separator"></div> : null}
									{checked.LM && values.LM > 0 && values.KmL ? (
										<div className="col-12 mt-3">
											<div className="row check-input">
												<TextField
													disabled
													size="small"
													variant="outlined"
													label="Km de Llano"
													value={Number(values.KmE) > 15
														? (Number(values.KmE) - 15 - values.KmL) > 0 ? (Number(values.KmE) - 15 - values.KmL) : ""
														: (Number(values.KmE) - values.KmL) > 0 ? (Number(values.KmE) - values.KmL) : ""
													}
													onChange={handleChange}
													name="KmLlano"
													id="KmLllano"
													InputProps={{
														inputComponent:
															customFormats.KmFormatCustom,
													}}
												/>
											</div>
										</div>
									) : null}
									{checked.LM && values.LM > 0 && values.KmL ? (
										<div className="col-12 mt-3">
											<div className="row check-input">
												<TextField
													disabled
													size="small"
													variant="outlined"
													label="Total Km de Llano"
													value={Number(values.KmE) > 15
														? (Number(values.KmE) - 15 - values.KmL) * values.CB > 0 ? (Number(values.KmE) - 15 - values.KmL) * values.CB : ""
														: (Number(values.KmE) - values.KmL) * values.CB > 0 ? (Number(values.KmE) - values.KmL) * values.CB : ""
													}
													onChange={handleChange}
													name="totalKmLlano"
													id="totalKmLlano"
													InputProps={{
														inputComponent:
															customFormats.NumberFormatCustom,
													}}
												/>
											</div>
										</div>
									) : null}
									<div className="col-12 mt-3">
										<div className="row check-input">
											<TextField
												size="small"
												variant="outlined"
												label="Costo Peaje"
												value={values.CP}
												onChange={handleChange}
												name="CP"
												id="CP"
												InputProps={{
													inputComponent:
														customFormats.NumberFormatCustom,
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/*  */}
						<div className="col-lg-6 mb-3">
							<div className="card mb-3">
								<div className="card-header">
									<h5 className="mb-0">Servicios</h5>
								</div>
								<div className="card-body pl-3">
									<div className="col-12 mt-3">
										<div className="row check-input">
											<CustomTextField
												rightCheckBox
												size="small"
												variant="outlined"
												values={values}
												checked={checked}
												setChecked={setChecked}
												shortName={"TN"}
												LongName={"Turno Nocturno"}
												Format={
													customFormats.PercentFormatCustom
												}
												handleChange={handleChange}
												alwaysDisabled
											/>
										</div>
									</div>
									<div className="col-12 mt-3">
										<div className="row check-input">
											<CustomTextField
												rightCheckBox
												size="small"
												variant="outlined"
												values={values}
												checked={checked}
												setChecked={setChecked}
												shortName={"FF"}
												LongName={
													"Feriado/Fin de semana"
												}
												Format={
													customFormats.PercentFormatCustom
												}
												handleChange={handleChange}
												alwaysDisabled
											/>
										</div>
									</div>
									<div className="col-12 mt-3">
										<div className="row check-input">
											<CustomTextField
												rightCheckBox
												size="small"
												variant="outlined"
												values={values}
												checked={checked}
												setChecked={setChecked}
												shortName={"EX"}
												LongName={"Extracción"}
												Format={
													customFormats.NumberFormatCustom
												}
												handleChange={handleChange}
											/>
										</div>
									</div>
									<div className="col-12 mt-3">
										<div className="row check-input">
											<CustomTextField
												rightCheckBox
												size="small"
												variant="outlined"
												values={values}
												checked={checked}
												setChecked={setChecked}
												shortName={"SP"}
												LongName={"Sobre peso"}
												Format={
													customFormats.PercentFormatCustom
												}
												handleChange={handleChange}
											/>
										</div>
									</div>
									{(checked.SP && values.KmE > 15) ? (
										<div className="col-12 mt-3">
											<div className="row check-input">
												<TextField
													size="small"
													variant="outlined"
													label="Kilómetros sobre peso"
													value={(Number(values.KmSP) <= Number(values.KmE)) ? values.KmSP : ""}
													onChange={handleChange}
													name="KmSP"
													id="KmSP"
													InputProps={{
														inputComponent:
															customFormats.KmFormatCustom,
													}}
												/>
											</div>
										</div>
									) : null}
									{(checked.SP && Number(values.KmSP) > 0 && values.KmE > 15) ? (
										<div className="col-12 mt-3">
											<div className="row check-input">
												<TextField
													disabled
													size="small"
													variant="outlined"
													label="Total Sobrepeso"
													value={(checked.SP && Number(values.KmSP) > 0 ) ? Number(values.KmSP) * Number(values.CB) * (Number(values.SP) / 100) : ""}
													onChange={handleChange}
													name="totalKmSP"
													id="totalKmSP"
													InputProps={{
														inputComponent:
															customFormats.NumberFormatCustom,
													}}
												/>
											</div>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SummaryContainer>
	);
};

export default ServiceSummary;

TextMaskCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
};
