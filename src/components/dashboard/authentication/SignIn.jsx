import { Fragment, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
// Asegúrate de que la ruta del logo sea correcta
import Logo from 'assets/images/brand/logo/Logo-utez-2.png';
import Swal from 'sweetalert2';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('utez_community', data.utez_community);
                console.log(data);

                const { utez_community } = data;
                if (['estudiante', 'egresado', 'publico'].includes(utez_community)) {
                    navigate('/marketing/student/dashboard/');
                } else if (['administrativo', 'profesor'].includes(utez_community)) {
                    navigate('/marketing/instructor/dashboard/');
                } else if (utez_community === 'admin') {
                    navigate('/dashboard/overview/');
                } else {
                    Swal.fire({
                        title: 'Acceso denegado',
                        text: 'Tu cuenta no tiene permisos para acceder.',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Correo electrónico o contraseña incorrectos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
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
