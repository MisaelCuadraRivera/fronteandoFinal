import { Fragment, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
// Asegúrate de que la ruta del logo sea correcta
import Logo from 'assets/images/brand/logo/Logo-utez-2.png';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Usamos useNavigate para redireccionar

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Realizar solicitud POST al endpoint /signin
        try {
            const response = await fetch('http://localhost:3001/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Correcciones aquí:
                localStorage.setItem('token', data.token); // Correcto
                // localStorage.setItem('token', response.token); // Incorrecto, debería ser data.token
                localStorage.setItem('user', JSON.stringify(data.user)); // Usa data.user en vez de response.user
                localStorage.setItem('utez_community', data.utez_community); // Agrega la comunidad del usuario (estudiante, egresado, etc.
                console.log(data)
                
                // Aquí manejas la lógica de redirección basada en la comunidad del usuario
                const { utez_community } = data;
                if (utez_community === 'estudiante' || utez_community === 'egresado' || utez_community === 'publico') {
                    navigate('/marketing/student/dashboard/');
                } else if (utez_community === 'administrativo' || utez_community === 'profesor') {
                    navigate('/marketing/instructor/dashboard/');
                } else if (utez_community === 'admin') {
                    navigate('/dashboard/overview/');
                } else {
                    alert('Tu cuenta no tiene permisos para acceder.');
                }
            } else {
                alert('Correo electrónico o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <Fragment>
            <Row className="align-items-center justify-content-center g-0 min-vh-100">
                <Col lg={5} md={5} className="py-8 py-xl-0">
                    <Card>
                        <Card.Body className="p-6">
                            <div className="mb-4">
                                <Link to="/">
                                    <div className='text-center'>
                                        <Image src={Logo} className="mb-4 w-50" alt="Logo" />
                                    </div>
                                </Link>
                                <h1 className="mb-1 fw-bold">Iniciar Sesión</h1>
                                <span>
                                    ¿No tienes una cuenta?{' '}
                                    <Link to="/authentication/sign-up" className="ms-1" style={{ color: "#009475" }}>
                                        Regístrate
                                    </Link>
                                </span>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={12} md={12} className="mb-3">
                                        <Form.Label>Correo Electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            id="email"
                                            placeholder="Correo electrónico"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Col>
                                    <Col lg={12} md={12} className="mb-3">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            id="password"
                                            placeholder="**************"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Col>
                                    <Col lg={12} md={12} className="mb-3">
                                        <div className="d-md-flex justify-content-between align-items-center">
                                            <Link to="/authentication/forget-password" style={{ color: "#009475" }}>
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                                        <Button type="submit" style={{ backgroundColor: "#042b61", borderColor: "white" }}>
                                            Iniciar Sesión
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default SignIn;
