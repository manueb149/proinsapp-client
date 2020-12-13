import React, { useState } from "react";
import { SummaryContainer } from "../../../layout/Service/Service.style";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import summaryCalc from "../../utils/summaryCalc";

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

function kmFormatCustom(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
			suffix=" Km"
		/>
	);
}

function NumberFormatCustom(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			isNumericString
			prefix="$"
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
		CB: "",
		CBPKM: "",
		CP: "",
		TN: "",
		FF: "",
		EX: "",
		SP: "",
		LM: ""
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
										value={summaryCalc(
											values.KmE,
											values.CB
										)}
										onChange={handleTotal}
										name="total"
										id="total"
										InputProps={{
											inputComponent: NumberFormatCustom,
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
												label={`${(Number(values.KmE)>15) ? (`${values.KmE}Km - 15Km = ${(Number(values.KmE)-15)}Km`) : ("Kilómetro Estipulado")}`}
												value={values.KmE}
												onChange={handleChange}
												name="KmE"
												id="KmE"
												InputProps={{
													inputComponent: kmFormatCustom,
												}}
											/>
										</div>
									</div>
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
													inputComponent: NumberFormatCustom,
												}}
											/>
										</div>
									</div>
									<div className="col-12 mb-3">
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
													inputComponent: NumberFormatCustom,
												}}
											/>
										</div>
									</div>
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
													inputComponent: NumberFormatCustom,
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
											<Checkbox
												name="TN"
												checked={checked.TN}
												onChange={(e) =>
													setChecked({
														...checked,
														[e.target.name]: e.target.checked
													})
												}
												inputProps={{
													"aria-label":
														"secondary checkbox",
												}}
											/>
											<TextField
												disabled={!checked.TN}
												size="small"
												variant="outlined"
												label="Turno Nocturno"
												value={values.TN}
												onChange={handleChange}
												name="TN"
												id="TN"
												InputProps={{
													inputComponent: NumberFormatCustom,
												}}
											/>
										</div>
									</div>
									<div className="col-12 mb-3">
										<div className="row check-input">
											<Checkbox
												name="FF"
												checked={checked.FF}
												onChange={(e) =>
													setChecked({
														...checked,
														[e.target.name]: e.target.checked
													})
												}
												inputProps={{
													"aria-label":
														"secondary checkbox",
												}}
											/>
											<TextField
												disabled={!checked.FF}
												size="small"
												variant="outlined"
												label="Feriado/Fin de semana"
												value={values.FF}
												onChange={handleChange}
												name="FF"
												id="FF"
												InputProps={{
													inputComponent: NumberFormatCustom,
												}}
											/>
										</div>
									</div>
									<div className="col-12 mb-3">
										<div className="row check-input">
											<Checkbox
												name="EX"
												checked={checked.EX}
												onChange={(e) =>
													setChecked({
														...checked,
														[e.target.name]: e.target.checked
													})
												}
												inputProps={{
													"aria-label":
														"secondary checkbox",
												}}
											/>
											<TextField
												disabled={!checked.EX}
												size="small"
												variant="outlined"
												label="Extracción"
												value={values.EX}
												onChange={handleChange}
												name="EX"
												id="EX"
												InputProps={{
													inputComponent: NumberFormatCustom,
												}}
											/>
										</div>
									</div>
									<div className="col-12 mb-3">
										<div className="row check-input">
											<Checkbox
												name="SP"
												checked={checked.SP}
												onChange={(e) =>
													setChecked({
														...checked,
														[e.target.name]: e.target.checked
													})
												}
												inputProps={{
													"aria-label":
														"secondary checkbox",
												}}
											/>
											<TextField
												disabled={!checked.SP}
												size="small"
												variant="outlined"
												label="Sobre peso"
												value={values.SP}
												onChange={handleChange}
												name="SP"
												id="SP"
												InputProps={{
													inputComponent: NumberFormatCustom,
												}}
											/>
										</div>
									</div>
									<div className="col-12 mb-3">
										<div className="row check-input">
											<Checkbox
												name="LM"
												checked={checked.LM}
												onChange={(e) =>
													setChecked({
														...checked,
														[e.target.name]: e.target.checked
													})
												}
												inputProps={{
													"aria-label":
														"secondary checkbox",
												}}
											/>
											<TextField
												disabled={!checked.LM}
												variant="outlined"
												label="Loma"
												value={values.LM}
												onChange={handleChange}
												name="LM"
												id="LM"
												size="small"
												InputProps={{
													inputComponent: NumberFormatCustom,
												}}
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

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
