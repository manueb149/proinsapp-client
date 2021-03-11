import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { LoginForm, LoginContainer } from "../../layout/Login/Login.style";
import AlertContext from "../../contexts/alerts/alertContext";
import AuthContext from "../../contexts/auth/authContext";
import SnackBar from "../utils/SnackBar";
import img from "../../assets/bg_loginn.png";

const Login = (props) => {
	// Definir state para iniciar sesión
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [showEye, setShowEye] = useState(false);
	const [openSB, setOpenSB] = useState(true);

	const { email, password } = user;

	// extraer los valores del context
	const alertContext = useContext(AlertContext);
	const { showAlert } = alertContext;

	const authContext = useContext(AuthContext);
	const { msg, authenticated, login } = authContext;

	// En caso de que el password o usuario no exista
	useEffect(() => {
		if (authenticated) {
			props.history.push("/dashboard");
		}
		if (msg) {
			showAlert(msg.text, msg.severity);
			setOpenSB(true);
		}
		// eslint-disable-next-line
	}, [msg, authenticated, props.history]);

	// Función onChange(handler) en campos dle formulario
	const userHandler = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = (e) => {
		e.preventDefault();

		// Validar que no haya campos vacios
		if (email.trim() === "" || password.trim() === "") {
			showAlert("Todos los campos son obligatorios", "warning");
			setOpenSB(true);
		}

		// Pasarlo al action
		login({ email: email.toLowerCase(), password });
	};

	const handleCloseSB = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSB(false);
	};

	return (
		<LoginContainer>
			{msg ? (
				<SnackBar
					severity={msg.severity}
					notification={msg.text}
					openSB={openSB}
					handleCloseSB={handleCloseSB}
				/>
			) : null}

			<div className="container-fluid login">
				<div className="overlay"><Image src={img} /></div>
				<div className="row my-auto justify-content-center">
					<div className="col-lg-4 col-md-6 col-sm-12">
						<LoginForm>
							<Form className="login-form" onSubmit={handleLogin}>
								<h1 className="login-title text-center">
									Iniciar Sesión
								</h1>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Usuario</Form.Label>
									<Form.Control
										type="email"
										placeholder="ejemplo@ejemplo.com"
										value={email}
										name="email"
										onChange={userHandler}
										required
									/>
									<Form.Text className="text-muted">
										Evita compartir tus credenciales con
										otros.
									</Form.Text>
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Contraseña</Form.Label>
									<div className="row showpassword">
										<Form.Control
											type={showEye ? "text" : "password"}
											placeholder="ingrese su clave aquí"
											value={password}
											name="password"
											onChange={userHandler}
											required
										/>
										<div className="eye">
											{showEye ? (
												<i
													onClick={() =>
														setShowEye(false)
													}
													className="fas fa-eye"
												></i>
											) : (
												<i
													onClick={() =>
														setShowEye(true)
													}
													className="fas fa-eye-slash"
												></i>
											)}
										</div>
									</div>
								</Form.Group>
								<div className="btn-box">
									<Button variant="primary" type="submit">
										Ingresar
									</Button>
								</div>
							</Form>
						</LoginForm>
					</div>
				</div>
			</div>
		</LoginContainer>
	);
};

export default Login;
