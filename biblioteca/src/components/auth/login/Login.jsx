import { useContext, useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import AuthContainer from "../authContainer/AuthContainer";
import {errorToast} from '../../ui/notifications/notifications'
import ToggleTheme from "../../services/theme/toggleTheme/ToggleTheme";
import {AuthenticationContext} from '../../services/auth/auth.context'
import ComboLanguage from "../../services/translation/comboLanguaje/ComboLanguage";
import { validateEmail, validatePassword, loginUser } from "../auth.services";


const Login = ({onLogin}) => {
    const { handleUserLogin } = useContext(AuthenticationContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email:false, 
        password:false,
    })

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
        setErrors({...errors, email: false})
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        setErrors({...errors, password: false})
    }

    
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!emailRef.current.value.length || !validateEmail(email)){
            setErrors({...errors, email: true})
            errorToast('Email incorrecto')
            emailRef.current.focus(); /*pasa el foco para que directamente pueda escribir en lo que da error*/
            return;
        }
        else if (!password.length || !validatePassword(password, 7, null, true, true)){
            setErrors({...errors, password:true});
            errorToast('Password incorrecto')
            passwordRef.current.focus()
            return;
        }

        setErrors({email:false, password:false});
        loginUser(
            email,
            password,
            (token) => {
                handleUserLogin(token);
                navigate('/library')
            },
            (err) => {
                errorToast(err.message)
            }
        )

        // fetch(`${baseUrl}/login`, {
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     method: 'POST',
        //     body: JSON.stringify({email, password})
        // })
        //     .then(async res=> {
        //         if (!res.ok){
        //             const errData = await res.json();
        //             throw new Error(errData.message || 'Algo ha salido mal');
        //         }

        //         return res.json()
        //     })
        //     .then(token => {
        //         localStorage.setItem('book-champions-token', token)
        //         navigate('/library')
        //     })
        //     .catch(err => {
        //         errorToast(err.message)
        //     })
    }

    return (
        <>
            <AuthContainer>
                <ComboLanguage/>
                <ToggleTheme/>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-4">
                        <Form.Control
                            type="email"
                            placeholder="Ingresar email"
                            onChange={handleEmailChange}
                            value={email}
                            ref={emailRef} 
                            className={errors.email && 'border border-danger'}/>
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Control
                            type="password"
                            placeholder="Ingresar contraseña"
                            onChange={handlePasswordChange}
                            value={password}
                            ref={passwordRef}
                            className={errors.password && 'border border-danger'}
                        />
                    </FormGroup>
                    <Row>
                        <Col />
                        <Col md={6} className="d-flex justify-content-end">
                            <Button variant="secondary" type="submit">
                                Iniciar sesión
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <p>¿Aun no tenes cuenta?</p>
                        <Button onClick={() => navigate("/register")} >Registrarse</Button>
                    </Row>
                </Form>
            </AuthContainer>
        {errors.email && <p className="text-danger">Email vacío</p>}
        {errors.password && <p className="text-danger">Contraseña vacía</p>}
        </>
    );
};


export default Login;