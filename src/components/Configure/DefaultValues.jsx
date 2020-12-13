import React, { useState } from "react";
import { DefaultValuesContainer } from "../../layout/Configure/Configure.style";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import CustomTextField from "../utils/CustomTextField";

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

function PesoKmFormatCustom(props) {
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
			suffix=" $/Km"
		/>
	);
}

function KmFormatCustom(props) {
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

function LessNumberFormatCustom(props) {
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
			prefix="<= $"
		/>
	);
}

function PercentFormatCustom(props) {
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
			suffix=" %"
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

const DefaultValues = () => {
	const classes = useStyles();
	const [checked, setChecked] = useState({
		TG: false,
		CR: false,
		EX: false,
		SP: false,
		LM: false,
		PE: false,
		SG: false,
		CE: false,
	});

	const [values, setValues] = useState({
		CP: "",
		TG: "",
		CR: "",
		EX: "",
		SP: "",
		LM: "",
		PE: "",
		SG: "",
		CE: "",
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<DefaultValuesContainer>
			<div className={classes.root}>
				<div className="card mb-3">
					<div className="card-header mb-1">
						<div className="title-flex">
							<span className="title mb-2 mt-2">
								<h5>
									Asingación de Valores Predeterminados
								</h5>
							</span>
							<span className="icon-button">
								<i className="fas fa-save"></i>
							</span>
						</div>
					</div>

					<div className="card-body">
						<div className="form-row px-3">
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"TG"}
										LongName={"Tansporte de Grúa"}
										Format={PesoKmFormatCustom}
										handleChange={handleChange}
									/>
								</div>
							</div>
							{/*  */}
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"CR"}
										LongName={"Cerragería"}
										Format={LessNumberFormatCustom}
										handleChange={handleChange}
									/>
								</div>
							</div>
							{/*  */}
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"EX"}
										LongName={"Extracción"}
										Format={LessNumberFormatCustom}
										handleChange={handleChange}
									/>
								</div>
							</div>
							{/*  */}
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"SP"}
										LongName={"Sobre peso"}
										Format={PercentFormatCustom}
										handleChange={handleChange}
									/>
								</div>
							</div>
							{/*  */}
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"LM"}
										LongName={"Subida loma"}
										Format={KmFormatCustom}
										handleChange={handleChange}
									/>
								</div>
							</div>
							{/*  */}
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"PE"}
										LongName={"Peaje"}
										Format={LessNumberFormatCustom}
										handleChange={handleChange}
									/>
								</div>
							</div>
							{/*  */}
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"SG"}
										LongName={"Suministros y Gasolina"}
										Format={LessNumberFormatCustom}
										handleChange={handleChange}
									/>
								</div>
							</div>
							{/*  */}
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"CE"}
										LongName={"Corriente y Encendido"}
										Format={LessNumberFormatCustom}
										handleChange={handleChange}
									/>
								</div>
							</div>
							{/*  */}
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"CG"}
										LongName={"Cambio de Gomas"}
										Format={LessNumberFormatCustom}
										handleChange={handleChange}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DefaultValuesContainer>
	);
};

export default DefaultValues;

TextMaskCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
};

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
