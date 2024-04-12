import React, { Fragment, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Alert } from 'react-bootstrap';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { token } = useParams(); // Obtiene el token de la URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica de las contraseñas
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:3001/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (!response.ok) {
            } else {
                setSuccess('Tu contraseña ha sido restablecida exitosamente.');
                // Opcionalmente, redirige al usuario al inicio de sesión después del éxito
                navigate('/authentication/sign-in');
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
        }
    };

    return (
        <Fragment>
            <Row className="align-items-center justify-content-center g-0 min-vh-100">
                <Col lg={5} md={5} className="py-8 py-xl-0">
                    <Card>
                        <Card.Body className="p-6">
                            <div className="mb-4">
                                <h1 className="mb-1 fw-bold">Restablecer Contraseña</h1>
                                <span>Introduce tu nueva contraseña a continuación.</span>
                            </div>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={12} md={12} className="mb-3">
                                        <Form.Label>Nueva Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Col>
                                    <Col lg={12} md={12} className="mb-3">
                                        <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Col>
                                    <Col lg={12} md={12} className="d-grid gap-2">
                                        <Button style={{ backgroundColor: "#042b61", borderColor: "white" }} type="submit">
                                            Restablecer Contraseña
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

export default ResetPassword;
