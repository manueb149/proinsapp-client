import React, { useState } from "react";
import { SummaryContainer } from "../../../layout/Service/Service.style";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import customFormats from "../../utils/customFormats";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import summaryCalc from "../../utils/summaryCalc";
import CustomTextField from "../../utils/CustomTextField";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

function TextMaskCustom(props) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={(ref) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={[
				"(",
				/[1-9]/,
				/\d/,
				/\d/,
				")",
				" ",
				/\d/,
				/\d/,
				/\d/,
				"-",
				/\d/,
				/\d/,
				/\d/,
				/\d/,
			]}
			placeholderChar={"\u2000"}
			showMask
		/>
	);
}

const ServiceSummary = () => {
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
		CB: "",
		CBPKM: "",
		CP: "",
		TN: "",
		FF: "",
		EX: "",
		SP: "",
		LM: "",
	});

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
						<h5 className="mb-0">Cálculo Resumen de Servicio</h5>
					</div>
					<div className="form-row px-3">
						<div className="col-lg-12 mb-1">
							<div className="card mb-3">
								<div className="card-header">
									<TextField
										disabled
										label="Total"
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
									<div className="col-12 mb-3">
										<div className="row check-input">
											<TextField
												size="small"
												variant="outlined"
												label={`${
													Number(values.KmE) > 15
														? `${
																values.KmE
														  }Km - 15Km = ${
																Number(
																	values.KmE
																) - 15
														  }Km`
														: "Kilómetro Estipulado"
												}`}
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
									{checked.LM ? (
										<div className="col-12 mb-3">
											<div className="row check-input">
												<TextField
													size="small"
													variant="outlined"
													label="Kilómetro de Loma"
													value={values.KmL}
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
									<div className="col-12 mb-3">
										<div className="row check-input">
											<TextField
												size="small"
												variant="outlined"
												label="Costo Base Km"
												value={values.CB}
												onChange={handleChange}
												name="CB"
												id="CB"
												InputProps={{
													inputComponent:
														customFormats.NumberFormatCustom,
												}}
											/>
										</div>
									</div>
									{/* <div className="col-12 mb-3">
										<div className="row check-input">
											<TextField
												size="small"
												variant="outlined"
												label="Costo Base/Km"
												value={values.CBPKM}
												onChange={handleChange}
												name="CBPKM"
												id="CBPKM"
												InputProps={{
													inputComponent:
														customFormats.NumberFormatCustom,
												}}
												disabled
											/>
										</div>
									</div> */}
									<div className="col-12 mb-3">
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
								<div className="card-body">
									<div className="col-12 mb-3">
										<div className="row check-input">
											<CustomTextField
												values={values}
												checked={checked}
												setChecked={setChecked}
												shortName={"TN"}
												LongName={"Turno Nocturno"}
												Format={
													customFormats.PercentFormatCustom
												}
												handleChange={handleChange}
											/>
										</div>
									</div>
									<div className="col-12 mb-3">
										<div className="row check-input">
											<CustomTextField
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
											/>
										</div>
									</div>
									<div className="col-12 mb-3">
										<div className="row check-input">
											<CustomTextField
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
									<div className="col-12 mb-3">
										<div className="row check-input">
											<CustomTextField
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
									<div className="col-12 mb-3">
										<div className="row check-input">
											<CustomTextField
												values={values}
												checked={checked}
												setChecked={setChecked}
												shortName={"LM"}
												LongName={"Loma"}
												Format={
													customFormats.PesoKmFormatCustom
												}
												handleChange={handleChange}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/*  */}
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
