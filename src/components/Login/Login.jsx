import React, { useState } from "react";
// import logo from "../../assets/logo_h.png";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  LoginForm,
  LoginHeader,
  LoginContainer,
} from "../../layout/Login/Login.style";
// import icon from "../../assets/i-crane.svg";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    
  // Definir state para iniciar sesión
  const [user, setUser] = useState({
    email:'',
    password: ''
  });
  const [error, setError] = useState(true);
  
  const { email, password } = user;

  const URL = `http://45.55.54.86:5000/api/v1/wildcard?key=CoNtable2020&op=SELECT&table=users&elem=email,pass`
  const history = useHistory();

  // Función onChange(handler) en campos dle formulario
  const userHandler = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value    
    });
  };

//   Función para hacer el checkin --->Ver Button al final del form
  const checkIn = e => {
    e.preventDefault(); 
    history.push('/dashboard')

    //   Validar que no haya campos vacíos
    if(email.trim() === '' && password.trim() === '') return;
    const getUsers = async()=>{
      try {
        const result = await axios.get(URL)
        result.data.forEach(element => {
          if(element[0] === email && element[1] === password){
            history.push('/dashboard')
            setError(false)
          } 
        });
        if(error){
          alert('Tu usuario o tu contraseña son incorrectos');
          setError(true);
        }
        
      } catch (error) { }
    }
    getUsers();
  }; 

  return (
    <LoginContainer>
      <div className="container-fluid">
        <div className="overlay"></div>
        <div className="row">
          <div className="col-12">
            <LoginHeader>
              {/* <Image src={logo} alt="logo" fluid /> */}
              <Link to="/">
                <h1>
                  {/* <img className="i-head" src={icon} alt={icon} /> */}
                  <span className="i-title">PROINSA</span>
                </h1>
              </Link>
            </LoginHeader>
          </div>
        </div>
        <div className="row my-auto justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <LoginForm>
              <Form className="login-form">
                <h1 className="login-title text-center">Iniciar Sesión</h1>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="ejemplo@ejemplo.com"
                    value={email}
                    name="email"
                    onChange={userHandler}
                  />
                  <Form.Text className="text-muted">
                    Evita compartir tus credenciales con otros.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="ingrese su clave aquí"
                    value={password}
                    name="password"
                    onChange={userHandler}
                  />
                </Form.Group>
                <div className="btn-box">
                    <Button variant="primary" type="button" onClick={checkIn}>
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
