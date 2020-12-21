import React, { useState, useContext, useEffect } from "react";
import { DefaultValuesContainer } from "../../layout/Configure/Configure.style";
import { serviceDataContext } from "../../contexts/ServiceDataContext";
import { defaultValuesContext } from "../../contexts/DefaultValuesContext";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import { makeStyles } from "@material-ui/core/styles";
import CustomTextField from "../utils/CustomTextField";
import axios from "../../config/http-common";
import SnackBar from "../utils/SnackBar";
import customFormats from "../utils/customFormats";
import AuthContext from "../../contexts/auth/authContext";
import { useHistory } from "react-router-dom";


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

const DefaultValues = () => {
	const classes = useStyles();
	const [openSB, setOpenSB] = useState(false);
	const history = useHistory();

	const ServiceDataContext = useContext(serviceDataContext);
	const DefaultValuesContext = useContext(defaultValuesContext);
	const authContext = useContext(AuthContext);

    const { logout } = authContext;

	const {
		severity,
		notification,
		setSeverity,
		setNotification,
	} = ServiceDataContext;

	const { values, setValues } = DefaultValuesContext;

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
		TN: false,
		FF: false,
	});

	useEffect(() => {
		const getValues = async () => {
			await axios
				.get("values")
				.then((res) => {
					setValues(res.data.values);
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

	const handleCloseSB = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSB(false);
	};

	const handleSave = async () => {
		if (
			values.TG === "" ||
			values.CR === "" ||
			values.EX === "" ||
			values.SP === "" ||
			values.LM === "" ||
			values.PE === "" ||
			values.SG === "" ||
			values.CE === "" ||
			values.VO === "" ||
			values.IN === "" ||
			values.CO === "" ||
			values.DM === ""
		) {
			setOpenSB(false);
			setSeverity("warning");
			setNotification("No deben haber campos vacíos");
			setOpenSB(true);
			return;
		}
		await axios
			.post("values/upload", {
				values,
			})
			.then((res) => {
				setOpenSB(false);
				setSeverity("success");
				setNotification(res.data.message);
				setOpenSB(true);
			})
			.catch((error) => {
				if (error.response) {
					// Request made and server responded
					if (error.response.data.text === "TNV") {
						logout();
						history.push("/");
					}else{
						setOpenSB(false);
						setSeverity("error");
						setNotification(error.response.data.message);
						setOpenSB(true);
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

	return (
		<DefaultValuesContainer>
			<SnackBar
				severity={severity}
				notification={notification}
				openSB={openSB}
				handleOpenSB={() => setOpenSB(true)}
				handleCloseSB={handleCloseSB}
			/>
			<div className={classes.root}>
				<div className="card mb-3">
					<div className="card-header mb-1">
						<div className="title-flex">
							<span className="title mb-2 mt-2">
								<h5>Asingación de Valores Predeterminados</h5>
							</span>
							<span
								className="icon-button"
								onClick={() => handleSave()}
							>
								<i className="fas fa-save"></i>
							</span>
						</div>
					</div>

					<div className="card-body">
						<div className="form-row px-3">
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"TG"}
										LongName={"Tansporte de Grúa"}
										Format={
											customFormats.PesoKmFormatCustom
										}
										handleChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"CR"}
										LongName={"Cerragería"}
										Format={
											customFormats.LessNumberFormatCustom
										}
										handleChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"EX"}
										LongName={"Extracción"}
										Format={
											customFormats.LessNumberFormatCustom
										}
										handleChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
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
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"LM"}
										LongName={"Subida loma"}
										Format={
											customFormats.PesoKmFormatCustom
										}
										handleChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"PE"}
										LongName={"Peaje"}
										Format={
											customFormats.LessNumberFormatCustom
										}
										handleChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"SG"}
										LongName={"Suministros y Gasolina"}
										Format={
											customFormats.LessNumberFormatCustom
										}
										handleChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"CE"}
										LongName={"Corriente y Encendido"}
										Format={
											customFormats.LessNumberFormatCustom
										}
										handleChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"CG"}
										LongName={"Cambio de Gomas"}
										Format={
											customFormats.LessNumberFormatCustom
										}
										handleChange={handleChange}
									/>
								</div>
							</div>

							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
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
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
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
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
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
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
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
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"TN"}
										LongName={"Tanda Nocturna"}
										Format={
											customFormats.PercentFormatCustom
										}
										handleChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-sm-12 col-md-6 col-lg-4 mb-3">
								<div className="row check-input">
									<CustomTextField
										size="small"
										variant="outlined"
										values={values}
										checked={checked}
										setChecked={setChecked}
										shortName={"FF"}
										LongName={"Feriado/Fin de semana"}
										Format={
											customFormats.PercentFormatCustom
										}
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
